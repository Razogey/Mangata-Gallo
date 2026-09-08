import express from "express"
import prisma from "../config/prisma.js"
import {serializeBigInt} from "../utils/serialize.js"

const router = express.Router()

// Gat All Collections

router.get("/", async (req, res) => {
    try {
        const collections = await prisma.collection.findMany({
            include: {
                highlights: {
                    orderBy: {
                        sortOrder: 'asc'
                    }
                },
                products: {
                    where : {
                        isActive: true,
                    },
                    include: {
                        images: {
                            orderBy: {
                                sortOrder: "asc",
                            },
                        },
                        variants: {
                            where: {
                                isActive: true,
                            },
                            orderBy: {
                                price: "asc"
                            }
                        } 
                    }
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        res.json({
            status: "ok",
            data: serializeBigInt(collections)
        })
    } catch (error) {
        console.log("Error fetching collections", error)
        res.status(500).json({
            status: "error",
            message: "Failed to fetch collections",
        })
    }
})

// Get Collection By slug

router.get("/:slug", async (req, res) => {
    try {
        const { slug } = req.params

        const collection = await prisma.collection.findUnique({
            where: {
                slug: slug
            },
            include: {
                highlights: {
                    orderBy: {
                        sortOrder: "asc"
                    },
                },
                products: {
                    where: {
                        isActive: true,
                    },   
                    include: {
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
                                price: "asc"
                            }
                        }
                    }
                }
            }
        })

        if (!collection) {
            return res.status(404).json({
                status: "error",
                message: "Collection Not Found",
            })
        }

        res.json({
            status: "ok",
            data: serializeBigInt(collection)
        })
    } catch (error) {
        console.log("Error fetching collection by slug:", error)
        res.status(500).json({
            message: "Failed to fetch collection."
        })
    }
})

export default router