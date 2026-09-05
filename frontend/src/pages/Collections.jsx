import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Card from "../components/Card";
import Banner from "../components/Banner";

import collections from "../data/collections";
import featuredProducts from "../data/featuredProducts";

import collectionsHeroImg from "../assets/collections-hero.jpg";

export default function Collections() {
    return (
        <main className="collections-page">
            <Banner
                title="Our Collections"
                description="Explore our carefully curated collections, designed to celebrate life's most meaningful moments."
                image={collectionsHeroImg}
            />

            <section className="collection-list" aria-labelledby="collection-heading">
                <div className="section-heading">
                    <h2 id="collection-heading">Explore Our Collections</h2>

                    <p>
                        Discover timeless jewelry crafted with exceptional
                        materials and attention to detail.
                    </p>
                </div>

                <div className="collection-grid">
                    {collections.map((collection) => (
                        <Card
                            key={collection.id}
                            image={collection.image}
                            title={collection.title}
                            description={collection.description}
                            link="Explore Collection"
                            path={`/collections/${collection.slug}`}
                            className="collection-card"
                        />
                    ))}
                </div>
            </section>

            <section className="featured-pieces" aria-labelledby="featured-heading">
                <div className="section-heading">
                    <h2 id="featured-heading">Featured Pieces</h2>

                    <p>
                        A selection of timeless designs from Mangata & Gallo.
                    </p>
                </div>

                <div className="featured-grid">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>

            <section className="collections-cta" aria-labelledby="collections-cta-heading">
                <div>
                    <h2 id="collections-cta-heading">Find Something Timeless</h2>

                    <p>
                        Discover jewelry designed to become part of your most meaningful
                        moments.
                    </p>

                    <Link to="/contact">
                        Contact Us
                    </Link>
                </div>
            </section>
        </main>
    );
}