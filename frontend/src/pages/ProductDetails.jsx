import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "../components/Button";

import { getProducts, getProductById } from "../api/products";

export default function ProductDetails() {
    const { slug } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProduct() {
            try {
                setLoading(true);
                setError("");

                const products = await getProducts();

                const productSummary = products.find(
                    (item) => item.slug === slug
                );

                if (!productSummary) {
                    setError(
                        "The product you're looking for doesn't exist."
                    );
                    return;
                }

                const productDetails = await getProductById(
                    productSummary.id
                );

                setProduct(productDetails);
            } catch (error) {
                console.error(
                    "Failed to load product:",
                    error
                );

                setError(
                    "Unable to load this product. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [slug]);

    if (loading) {
        return (
            <main className="product-details">
                <div className="product-not-found">
                    <p>Loading product...</p>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="product-details">
                <div className="product-not-found">
                    <h1>Product Not Found</h1>

                    <p>
                        {error ||
                            "The product you're looking for doesn't exist."}
                    </p>

                    <Link to="/collections">
                        <span className="back-link">
                            ←
                        </span>{" "}
                        Back to Collections
                    </Link>
                </div>
            </main>
        );
    }

    const primaryImage =
        product.images?.find(
            (image) => image.is_primary
        ) || product.images?.[0];

    const categoryName =
        typeof product.category === "object"
            ? product.category?.name
            : product.category;

    const firstVariant = product.variants?.find(
        (variant) => variant.is_active
    );

    return (
        <main className="product-details">
            <section className="product-details-content">
                <div className="product-details-image">
                    <img
                        src={primaryImage?.image_url}
                        alt={
                            primaryImage?.alt_text ||
                            product.name
                        }
                    />
                </div>

                <div className="product-details-info">
                    {categoryName && (
                        <span className="product-category">
                            {categoryName}
                        </span>
                    )}

                    <h1>{product.name}</h1>

                    {firstVariant?.price && (
                        <p className="product-price">
                            {firstVariant.price}
                        </p>
                    )}

                    <p className="product-description">
                        {product.description}
                    </p>

                    {product.details && (
                        <p className="product-details-text">
                            {product.details}
                        </p>
                    )}

                    <Button
                        to="/contact"
                        className="product-contact"
                    >
                        Inquire About This Piece
                    </Button>

                    <Link
                        to="/collections"
                        className="back-link"
                    >
                        ← Back to Collections
                    </Link>
                </div>
            </section>
        </main>
    );
}