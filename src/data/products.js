import engagement from "../assets/products/engagement.jpg";
import wedding from "../assets/products/wedding.jpg";
import collection from "../assets/products/collection.jpg";

const products = [
    {
        id: 1,
        image: engagement,
        title: "Engagement Rings",
        description:
            "Find the perfect symbol of your love with our collection of elegant diamond engagement rings, thoughtfully designed for your special moment.",
        link: "Discover Rings",
        path: "/collections",
    },
    {
        id: 2,
        image: wedding,
        title: "Wedding Collection",
        description:
            "Celebrate your journey together with beautifully crafted pieces designed to complement every unforgettable moment of your wedding day.",
        link: "View Collection",
        path: "/collections",
    },
    {
        id: 3,
        image: collection,
        title: "Luxury Jewelry Collections",
        description:
            "Explore Mangata & Gallo's signature designs, where classic elegance meets exceptional craftsmanship and modern sophistication.",
        link: "Shop Jewelry",
        path: "/collections",
    },
];

export default products;