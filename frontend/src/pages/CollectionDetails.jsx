import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { getCollections } from "../api/collections";
import { getProducts } from "../api/products";

export default function CollectionDetails() {
    const { slug } = useParams();

    const [collection, setCollection] = useState(null);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCollection() {
            try {
                setLoading(true);
                setError("");

                const [collectionsData, productsData] =
                    await Promise.all([
                        getCollections(),
                        getProducts(),
                    ]);

                const currentCollection = collectionsData.find(
                    (item) => item.slug === slug
                );

                if (!currentCollection) {
                    setError(
                        "The collection you're looking for doesn't exist."
                    );
                    return;
                }

                const collectionProducts = productsData.filter(
                    (product) =>
                        product.collection?.slug === currentCollection.slug
                );

                setCollection(currentCollection);
                setProducts(collectionProducts);
            } catch (error) {
                console.error(
                    "Failed to load collection:",
                    error
                );

                setError(
                    "Unable to load this collection. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        }

        loadCollection();
    }, [slug]);

    if (loading) {
        return (
            <main className="collection-details">
                <div className="collection-not-found">
                    <p>Loading collection...</p>
                </div>
            </main>
        );
    }

    if (error || !collection) {
        return (
            <main className="collection-details">
                <div className="collection-not-found">
                    <h1>Collection Not Found</h1>

                    <p>
                        {error ||
                            "The collection you're looking for doesn't exist."}
                    </p>

                    <Link to="/collections">
                        ← Back to Collections
                    </Link>
                </div>
            </main>
        );
    }

    const primaryImage =
        collection.images?.find(
            (image) => image.is_primary
        ) || collection.images?.[0];

    return (
        <main className="collection-details">
            <section className="collection-details-hero">
                {primaryImage && (
                    <div className="collection-details-image">
                        <img
                            src={primaryImage.image_url}
                            alt={
                                primaryImage.alt_text ||
                                collection.title
                            }
                        />
                    </div>
                )}

                <div className="collection-details-info">
                    <span className="collection-label">
                        Collection
                    </span>

                    <h1>{collection.title}</h1>

                    <p className="collection-description">
                        {collection.description}
                    </p>
                </div>
            </section>

            <section
                className="collection-details-content"
                aria-labelledby="collection-story-heading"
            >
                <div className="section-heading">
                    <h2 id="collection-story-heading">
                        About the Collection
                    </h2>
                </div>

                <p>{collection.details}</p>

                {collection.highlights?.length > 0 && (
                    <div className="collection-highlights">
                        <h2>Highlights</h2>

                        <ul>
                            {[...collection.highlights]
                                .sort(
                                    (a, b) =>
                                        a.sort_order - b.sort_order
                                )
                                .map((highlight) => (
                                    <li key={highlight.id}>
                                        {highlight.text}
                                    </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            <section
                className="collection-products"
                aria-labelledby="collection-products-heading"
            >
                <div className="section-heading">
                    <h2 id="collection-products-heading">
                        Pieces from This Collection
                    </h2>

                    <p>
                        Explore selected pieces from the{" "}
                        {collection.title} collection.
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="featured-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="auth-status">
                        No products are currently available
                        in this collection.
                    </p>
                )}
            </section>

            <div className="collection-details-back">
                <Link to="/collections">
                    ← Back to Collections
                </Link>
            </div>
        </main>
    );
}