import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Card from "../components/Card";
import Banner from "../components/Banner";

import collectionsHeroImg from "../assets/collections-hero.jpg";

import { getCollections } from "../api/collections";
import { getProducts } from "../api/products";

export default function Collections() {
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);

    const [loadingCollections, setLoadingCollections] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const [collectionsError, setCollectionsError] = useState("");
    const [productsError, setProductsError] = useState("");

    useEffect(() => {
        async function loadCollections() {
            try {
                const data = await getCollections();
                setCollections(data);
            } catch (error) {
                console.error("Failed to load collections:", error);
                setCollectionsError(
                    "Unable to load collections. Please try again later."
                );
            } finally {
                setLoadingCollections(false);
            }
        }

        loadCollections();
    }, []);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products:", error);
                setProductsError(
                    "Unable to load products. Please try again later."
                );
            } finally {
                setLoadingProducts(false);
            }
        }

        loadProducts();
    }, []);

    return (
        <main className="collections-page">
            <Banner
                title="Our Collections"
                description="Explore our carefully curated collections, designed to celebrate life's most meaningful moments."
                image={collectionsHeroImg}
            />

            <section
                className="collection-list"
                aria-labelledby="collection-heading"
            >
                <div className="section-heading">
                    <h2 id="collection-heading">
                        Explore Our Collections
                    </h2>

                    <p>
                        Discover timeless jewelry crafted with exceptional
                        materials and attention to detail.
                    </p>
                </div>

                {loadingCollections && (
                    <p className="auth-status">
                        Loading collections...
                    </p>
                )}

                {collectionsError && (
                    <p
                        className="auth-status auth-status-error"
                        role="alert"
                    >
                        {collectionsError}
                    </p>
                )}

                {!loadingCollections &&
                    !collectionsError && (
                        <div className="collection-grid">
                            {collections.map((collection) => {
                                const primaryImage =
                                    collection.images?.find(
                                        (image) => image.is_primary
                                    ) ||
                                    collection.images?.[0];

                                return (
                                    <Card
                                        key={collection.id}
                                        image={primaryImage?.image_url}
                                        title={collection.title}
                                        description={collection.description}
                                        link="Explore Collection"
                                        path={`/collections/${collection.slug}`}
                                        className="collection-card"
                                    />
                                );
                            })}
                        </div>
                    )}
            </section>

            <section
                className="featured-pieces"
                aria-labelledby="featured-heading"
            >
                <div className="section-heading">
                    <h2 id="featured-heading">
                        Featured Pieces
                    </h2>

                    <p>
                        A selection of timeless designs from
                        Mangata & Gallo.
                    </p>
                </div>

                {loadingProducts && (
                    <p className="auth-status">
                        Loading products...
                    </p>
                )}

                {productsError && (
                    <p
                        className="auth-status auth-status-error"
                        role="alert"
                    >
                        {productsError}
                    </p>
                )}

                {!loadingProducts &&
                    !productsError && (
                        <div className="featured-grid">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}
            </section>

            <section
                className="collections-cta"
                aria-labelledby="collections-cta-heading"
            >
                <div>
                    <h2 id="collections-cta-heading">
                        Find Something Timeless
                    </h2>

                    <p>
                        Discover jewelry designed to become part
                        of your most meaningful moments.
                    </p>

                    <Link to="/contact">
                        Contact Us
                    </Link>
                </div>
            </section>
        </main>
    );
}