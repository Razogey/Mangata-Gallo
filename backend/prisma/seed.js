import "dotenv/config";
import prisma from "../src/config/prisma.js";

async function main() {
    console.log("Starting database seed...");

    // =========================
    // Collections
    // =========================

    const collections = [
        {
            slug: "engagement",
            title: "Engagement Rings",
            description:
                "Discover elegant engagement rings crafted to celebrate the beginning of your forever.",
            details:
                "Our engagement collection brings together timeless designs created to mark one of life's most meaningful moments. Each piece combines elegant proportions, refined details, and lasting beauty.",
            highlights: [
                "Timeless diamond designs",
                "Elegant and refined craftsmanship",
                "Created for meaningful moments",
            ],
        },
        {
            slug: "wedding",
            title: "Wedding Jewelry",
            description:
                "Explore timeless pieces designed to complement every unforgettable moment of your wedding day.",
            details:
                "The wedding collection is designed to celebrate the journey of two people coming together. From classic bands to refined jewelry pieces, each design adds an elegant touch to your special day.",
            highlights: [
                "Classic wedding bands",
                "Elegant designs for special occasions",
                "Crafted to celebrate lasting commitment",
            ],
        },
        {
            slug: "luxury",
            title: "Luxury Jewelry",
            description:
                "Discover signature designs where classic elegance meets exceptional craftsmanship.",
            details:
                "Our luxury collection reflects the signature style of Mangata & Gallo. Sophisticated designs, timeless forms, and carefully considered details create pieces made to be treasured.",
            highlights: [
                "Signature Mangata & Gallo designs",
                "Classic elegance with modern sophistication",
                "Exceptional attention to detail",
            ],
        },
    ];

    for (const collection of collections) {
        const { highlights, ...collectionData } = collection;

        const createdCollection = await prisma.collection.upsert({
            where: {
                slug: collectionData.slug,
            },
            update: collectionData,
            create: collectionData,
        });

        await prisma.collectionHighlight.deleteMany({
            where: {
                collectionId: createdCollection.id,
            },
        });

        await prisma.collectionHighlight.createMany({
            data: highlights.map((text, index) => ({
                collectionId: createdCollection.id,
                text,
                sortOrder: index,
            })),
        });
    }

    console.log("Collections seeded successfully.");

    // =========================
    // Categories
    // =========================

    const categories = [
        {
            slug: "rings",
            name: "Rings",
            description: "Elegant rings crafted for timeless moments.",
        },
        {
            slug: "wedding-jewelry",
            name: "Wedding Jewelry",
            description:
                "Timeless jewelry designed to celebrate every wedding moment.",
        },
        {
            slug: "luxury-jewelry",
            name: "Luxury Jewelry",
            description:
                "Sophisticated jewelry combining classic elegance and modern craftsmanship.",
        },
    ];

    for (const category of categories) {
        await prisma.category.upsert({
            where: {
                slug: category.slug,
            },
            update: category,
            create: category,
        });
    }

    console.log("Categories seeded successfully.");

    // =========================
    // Products
    // =========================

    const products = [
        {
            slug: "classic-diamond-ring",
            name: "Classic Diamond Ring",
            description:
                "A timeless diamond ring designed with elegance and simplicity.",
            categorySlug: "rings",
            collectionSlug: "engagement",
            price: 2500.0,
            sku: "MNG-RING-001",
            imageUrl: "/Mangata-Gallo/images/products/engagement.jpg",
            altText: "Classic Diamond Ring",
        },
        {
            slug: "golden-wedding-band",
            name: "Golden Wedding Band",
            description:
                "A refined wedding band crafted to symbolize a lifetime together.",
            categorySlug: "wedding-jewelry",
            collectionSlug: "wedding",
            price: 1800.0,
            sku: "MNG-WEDDING-001",
            imageUrl: "/Mangata-Gallo/images/products/wedding.jpg",
            altText: "Golden Wedding Band",
        },
        {
            slug: "signature-gold-ring",
            name: "Signature Gold Ring",
            description:
                "A sophisticated gold piece combining classic design with modern elegance.",
            categorySlug: "luxury-jewelry",
            collectionSlug: "luxury",
            price: 2200.0,
            sku: "MNG-LUXURY-001",
            imageUrl: "/Mangata-Gallo/images/products/collection.jpg",
            altText: "Signature Gold Ring",
        },
        {
            slug: "elegant-jewelry-piece",
            name: "Elegant Jewelry Piece",
            description:
                "A beautifully crafted piece designed for timeless everyday elegance.",
            categorySlug: "luxury-jewelry",
            collectionSlug: "luxury",
            price: 1950.0,
            sku: "MNG-LUXURY-002",
            imageUrl: "/Mangata-Gallo/images/products/collection.jpg",
            altText: "Elegant Jewelry Piece",
        },
    ];

    for (const product of products) {
        const category = await prisma.category.findUnique({
            where: {
                slug: product.categorySlug,
            },
        });

        const collection = await prisma.collection.findUnique({
            where: {
                slug: product.collectionSlug,
            },
        });

        if (!category || !collection) {
            throw new Error(
                `Category or collection not found for product: ${product.slug}`
            );
        }

        const createdProduct = await prisma.product.upsert({
            where: {
                slug: product.slug,
            },
            update: {
                name: product.name,
                description: product.description,
                categoryId: category.id,
                collectionId: collection.id,
                isActive: true,
            },
            create: {
                slug: product.slug,
                name: product.name,
                description: product.description,
                categoryId: category.id,
                collectionId: collection.id,
                isActive: true,
            },
        });

        // =========================
        // Product Image
        // =========================

        await prisma.productImage.deleteMany({
            where: {
                productId: createdProduct.id,
            },
        });

        await prisma.productImage.create({
            data: {
                productId: createdProduct.id,
                imageUrl: product.imageUrl,
                altText: product.altText,
                sortOrder: 0,
                isPrimary: true,
            },
        });

        // =========================
        // Product Variant
        // =========================

        await prisma.productVariant.upsert({
            where: {
                sku: product.sku,
            },
            update: {
                price: product.price,
                stockQuantity: 10,
                isActive: true,
            },
            create: {
                productId: createdProduct.id,
                sku: product.sku,
                price: product.price,
                stockQuantity: 10,
                isActive: true,
            },
        });
    }

    console.log("Products seeded successfully.");
}

main()
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
