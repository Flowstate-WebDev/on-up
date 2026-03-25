import { prisma } from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js";

interface BookData {
  title: string;
  slug: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  releaseYear?: number;
  professionIds?: string[];
  qualificationIds?: string[];
}

export async function getBooks() {
  const books = await prisma.book.findMany({
    include: {
      professions: {
        include: {
          profession: true,
        },
      },
      qualifications: {
        include: {
          qualification: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return books;
}

export async function createBook(data: BookData) {
  try {
    const { professionIds, qualificationIds, ...bookData } = data;

    // Ensure sequential ID
    const lastBook = await prisma.book.findFirst({
      orderBy: { id: "desc" },
    });

    const nextId = lastBook
      ? (parseInt(String(lastBook.id), 10) + 1).toString()
      : "1";

    console.log(
      "\x1b[93m%s\x1b[0m",
      `[Books] Creating book: ${nextId}, name: ${bookData.title}`,
    );

    return await prisma.book.create({
      data: {
        ...bookData,
        id: nextId,
        professions: {
          create: (professionIds || []).map((id) => ({
            professionId: id,
          })),
        },
        qualifications: {
          create: (qualificationIds || []).map((id) => ({
            qualificationId: id,
          })),
        },
      },
      include: {
        professions: { include: { profession: true } },
        qualifications: { include: { qualification: true } },
      },
    });
  } catch (error: any) {
    console.error("\x1b[91m%s\x1b[0m", "[Prisma] Error (createBook):", error);
    if (error.code === "P2002") {
      throw new Error(
        `Produkt o tym tytule lub slugu już istnieje (${error.meta?.target})`,
      );
    }
    throw error;
  }
}

export async function updateBook(id: string | number, data: Partial<BookData>) {
  try {
    const stringId = String(id);
    const { professionIds, qualificationIds, ...bookData } = data;

    // Remove ID from bookData if it exists to avoid trying to update PK
    const { id: _, ...cleanUpdateData } = bookData as any;
    const updateData: any = { ...cleanUpdateData };

    if (professionIds) {
      updateData.professions = {
        deleteMany: {},
        create: professionIds.map((id) => ({
          professionId: id,
        })),
      };
    }

    if (qualificationIds) {
      updateData.qualifications = {
        deleteMany: {},
        create: qualificationIds.map((id) => ({
          qualificationId: id,
        })),
      };
    }

    return await prisma.book.update({
      where: { id: stringId },
      data: updateData,
      include: {
        professions: { include: { profession: true } },
        qualifications: { include: { qualification: true } },
      },
    });
  } catch (error: any) {
    console.error("\x1b[91m%s\x1b[0m", "[Prisma] Error (updateBook):", error);
    throw error;
  }
}

export async function deleteBook(id: string | number) {
  try {
    const stringId = String(id);

    // Fetch the book first to get its imageUrl for Cloudinary cleanup
    const book = await prisma.book.findUnique({ where: { id: stringId } });

    // If the image is hosted on Cloudinary, delete it
    if (book?.imageUrl && book.imageUrl.includes("res.cloudinary.com")) {
      try {
        // Extract public_id from the URL: everything after "/upload/" (strip version + extension)
        const uploadIndex = book.imageUrl.indexOf("/upload/");
        if (uploadIndex !== -1) {
          let publicId = book.imageUrl.slice(uploadIndex + 8); // after "/upload/"
          // Remove version segment (v12345678/) if present
          publicId = publicId.replace(/^v\d+\//, "");
          // Remove file extension
          publicId = publicId.replace(/\.[^/.]+$/, "");
          await cloudinary.uploader.destroy(publicId);
          console.log(
            "\x1b[92m%s\x1b[0m",
            `[Cloudinary] Deleted image: ${publicId}`,
          );
        }
      } catch (cloudErr) {
        // Log but don't block the book deletion if Cloudinary fails
        console.error(
          "\x1b[91m%s\x1b[0m",
          "[Cloudinary] Failed to delete image:",
          cloudErr,
        );
      }
    }

    return await prisma.book.delete({
      where: { id: stringId },
    });
  } catch (error: any) {
    console.error("\x1b[91m%s\x1b[0m", "[Prisma] Error (deleteBook):", error);
    throw error;
  }
}
