import { PrismaClient } from "@prisma/client";
import { doSeed } from "./seedData";
const prisma = new PrismaClient();

doSeed(prisma)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
