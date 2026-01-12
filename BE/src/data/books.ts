import { prisma } from "../lib/prisma.js";

async function getBooks() {
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
  });
  return books;
}

export default getBooks;
