import prisma from "../src/utils/prisma.ts";

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "John", lastname: "Smith" },
      { name: "Jane", lastname: "Doe" },
      { name: "Ernie", lastname: "Gooday" }
    ]
  });

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main().finally(async () => await prisma.$disconnect());
