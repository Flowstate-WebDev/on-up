import { prisma } from "../lib/prisma.js";

interface BookData {
  title: string;
  slug: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock: number;
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
      id: 'asc'
    },
  });
  return books;
}

export async function createBook(data: BookData) {
  const { professionIds, qualificationIds, ...bookData } = data;
  return await prisma.book.create({
    data: {
      ...bookData,
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
}

export async function updateBook(id: string, data: Partial<BookData>) {
  const { professionIds, qualificationIds, ...bookData } = data;

  // For simplicity, we'll replace all professions/qualifications if provided
  const updateData: any = { ...bookData };

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
    where: { id },
    data: updateData,
    include: {
      professions: { include: { profession: true } },
      qualifications: { include: { qualification: true } },
    },
  });
}

export async function deleteBook(id: string) {
  return await prisma.book.delete({
    where: { id },
  });
}

export default getBooks;

