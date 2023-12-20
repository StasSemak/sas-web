const { PrismaClient } = require("@prisma/client");
const { categories, institutes } = require("./data");

const prisma = new PrismaClient();

const seed = async () => {
    try {
        await prisma.category.createMany({
            data: categories,
        })
        console.log("Categories are seeded!")
        await prisma.institute.createMany({
            data: institutes,
        })
        console.log("Institutes are seeded!")
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
    finally {
        await prisma.$disconnect();
    }
}

seed();