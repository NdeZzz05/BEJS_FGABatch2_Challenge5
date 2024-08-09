const prisma = require("../config/prisma");

const TransactionTypes = [{ name: "WITHDRAW" }, { name: "TRANSFER" }, { name: "DEPOSIT" }];

async function main() {
  console.log("Seeding data...");

  for (const type of TransactionTypes) {
    await prisma.transaction_Type.create({ data: type });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
