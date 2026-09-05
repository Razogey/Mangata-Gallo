import engagement from "../assets/products/engagement.jpg";
import wedding from "../assets/products/wedding.jpg";
import collection from "../assets/products/collection.jpg";

const featuredProducts = [
    {
        id: 1,
        slug: "classic-diamond-ring",
        image: engagement,
        title: "Classic Diamond Ring",
        category: "Rings",
        collection: "engagement",
        price: "$2,500",
        description:
            "A timeless diamond ring designed with elegance and simplicity.",
        details:
            "Crafted with exceptional attention to detail, this classic diamond ring combines refined design with timeless elegance.",
    },
    {
        id: 2,
        slug: "golden-wedding-band",
        image: wedding,
        title: "Golden Wedding Band",
        category: "Wedding Jewelry",
        collection: "wedding",
        price: "$1,800",
        description:
            "A refined wedding band crafted to symbolize a lifetime together.",
        details:
            "A beautifully crafted gold wedding band designed to celebrate a lasting commitment and complement every special moment.",
    },
    {
        id: 3,
        slug: "signature-gold-ring",
        image: collection,
        title: "Signature Gold Ring",
        category: "Luxury Jewelry",
        collection: "luxury",
        price: "$2,200",
        description:
            "A sophisticated gold piece combining classic design with modern elegance.",
        details:
            "Our signature gold ring brings together classic craftsmanship and contemporary sophistication in a refined everyday piece.",
    },
    {
        id: 4,
        slug: "elegant-jewelry-piece",
        image: collection,
        title: "Elegant Jewelry Piece",
        category: "Luxury Jewelry",
        collection: "luxury",
        price: "$1,950",
        description:
            "A beautifully crafted piece designed for timeless everyday elegance.",
        details:
            "Designed for effortless elegance, this piece combines sophisticated styling with the quality craftsmanship of Mangata & Gallo.",
    },
];

export default featuredProducts;