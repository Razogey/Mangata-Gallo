import { Link } from "react-router-dom";

import Card from "../components/Card";
import collections from "../data/collections";
import featuredProducts from "../data/featuredProducts";

import collectionsHeroImg from "../assets/collections-hero.jpg";

export default function Collections() {
    return (
        <main className="collections-page">
            <section 
                className="collections-hero" 
                style={{ 
                    backgroundImage: `url(${collectionsHeroImg})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat' 
                }}
                >
                <div className="hero-content">
                    <h1>Our Collections</h1>
                    <p>Explore our carefully curated collections, designed to celebrate life's most meaningful moments.</p>
                </div>
            </section>

            <section className="collection-list">
                <div className="section-heading">
                    <h2>Explore Our Collections</h2>

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
                            path={collection.path}
                            className="collection-card"
                        />
                    ))}
                </div>
            </section>

            <section className="featured-pieces">
                <div className="section-heading">
                    <h2>Featured Pieces</h2>

                    <p>
                        A selection of timeless designs from Mangata & Gallo.
                    </p>
                </div>

                <div className="featured-grid">
                    {featuredProducts.map((product) => (
                        <article className="featured-card" key={product.id}>
                            <span>{product.category}</span>

                            <h3>{product.title}</h3>

                            <p>{product.description}</p>

                            <Link to={`/products/${product.slug}`}>
                                View Details
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="collections-cta">
                <div>
                    <h2>Find Something Timeless</h2>

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