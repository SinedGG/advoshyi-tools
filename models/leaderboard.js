const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async add(id) {
    return await prisma.leaderboard.upsert({
      where: {
        tg_id: id,
      },
      update: {
        score: { increment: 1 },
      },
      create: {
        tg_id: id,
      },
    });
  },
  async get() {
    return await prisma.leaderboard.findMany({
      orderBy: {
        score: "desc",
      },
    });
  },
};
