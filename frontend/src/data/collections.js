import engagement from "../assets/products/engagement.jpg";
import wedding from "../assets/products/wedding.jpg";
import collection from "../assets/products/collection.jpg";

const collections = [
    {
        id: 1,
        slug: "engagement",
        image: engagement,
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
        id: 2,
        slug: "wedding",
        image: wedding,
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
        id: 3,
        slug: "luxury",
        image: collection,
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

export default collections;