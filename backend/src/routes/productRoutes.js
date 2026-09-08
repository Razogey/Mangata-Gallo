import express from "express";
import prisma from "../config/prisma.js";
import { serializeBigInt } from "../utils/serialize.js";

const router = express.Router();


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

// Get Product By Slug

router.get("/:slug", async (req, res) => {
    try {
        const {slug} = req.params

        const product = await prisma.product.findUnique({
            where: {
                slug: slug,
            },
            include: {
                category: true,
                collection: true,
                images: true,
                variants: {
                    where: {
                        isActive: true,
                    },
                    orderBy: {
                        price: "asc",
                    },
                },
            },
        })

        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product Not Found",
            })
        }
        
        res.json({
            status: "ok",
            data: serializeBigInt(product)
        })
    } catch (error) {
        console.log("Error fetching product by slug:", error)
        res.status(500).json({
            message: "Error fetching product by slug"
        })
    }
})

export default router;