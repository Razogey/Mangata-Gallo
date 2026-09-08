import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

const serializeBigInt = (value) => {
    return JSON.parse(
        JSON.stringify(value, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    )
}

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true
            },
            include: {
                category: true,
                collection: true,
                images: {
                    orderBy: {
                        sortOrder: 'asc'
                    },
                },
                variants: {
                    where: {
                        isActive: true
                    },
                    orderBy: {
                        price: 'asc'
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json({
            status:"ok",
            data:serializeBigInt(products),
        })
    } catch (error) {
        console.log("Error fetching products:", error)
        res.status(500).json({
            status: "error",
            message: "Failed to fetch products."
        });
    }
           
})

export default router;