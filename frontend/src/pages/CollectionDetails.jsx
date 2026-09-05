import { Link, useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

import featuredProducts from "../data/featuredProducts";
import collections from "../data/collections";
import Button from "../components/Button";

export default function CollectionDetails() {
    const { slug } = useParams();

    const collection = collections.find(
        (item) => item.slug === slug
    );

    const products = featuredProducts.filter((product) => product.collection === slug);

    if (!collection) {
        return (
            <main className="collection-details">
                <div className="collection-not-found">
                    <h1>Collection Not Found</h1>

                    <p>
                        The collection you're looking for doesn't exist.
                    </p>

                    <Link to="/collections">
                        Back to Collections
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="collection-details">
            <section className="collection-details-content">
                <div className="collection-details-image">
                    <img
                        src={collection.image}
                        alt={collection.title}
                    />
                </div>

                <div className="collection-details-info">
                    <span>Collection</span>

                    <h1>{collection.title}</h1>

                    <p>{collection.description}</p>

                    <p className="collection-details-text">
                        {collection.details}
                    </p>

                    <ul className="collection-highlights">
                        {collection.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                        ))}
                    </ul>

                    <Button to="/contact">
                        Inquire About This Collection
                    </Button>

                    <Link
                        to="/collections"
                        className="back-link"
                    >
                        <span className="back-arrow" aria-hidden="true">←</span>     
                         Back to Collections
                    </Link>
                </div>
            </section>

            <section className="collection-products">
                <div className="section-heading">
                    <h2>Featured Pieces</h2>
                    <p>
                        Discover selected pieces from this collection.
                    </p>
                </div>

                <div className="collection-products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}