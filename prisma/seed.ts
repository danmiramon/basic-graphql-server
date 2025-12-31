import prisma from "../src/utils/prisma.ts";

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "Daniel", lastname: "Miramontes" },
      { name: "Pamela", lastname: "Rubio" },
      { name: "Ernesto", lastname: "Buendia" }
    ]
  });

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main().finally(async () => await prisma.$disconnect());
