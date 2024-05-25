import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import data from "./seeds";
async function main() {
  // clear the database
  await prisma.review.deleteMany({});
  await prisma.item.deleteMany({});

  const { reviews, items } = data;
  for (const item of items) {
    await prisma.item.create({
      data: item,
    });
  }
  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
