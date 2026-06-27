const { PrismaClient } = require('@prisma/client');
try {
  const p = new PrismaClient();
  console.log("Success! Prisma Client initialized.");
} catch (e) {
  console.log(e.message);
}
