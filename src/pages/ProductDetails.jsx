import { Link, useParams } from "react-router-dom";

import featuredProducts from "../data/featuredProducts";

export default function ProductDetails() {
    const { slug } = useParams();

    const product = featuredProducts.find(
        (item) => item.slug === slug
    );

    if (!product) {
        return (
            <main className="product-details">
                <div className="product-not-found">
                    <h1>Product Not Found</h1>

                    <p>
                        The product you're looking for doesn't exist.
                    </p>

                    <Link to="/collections">
                        Back to Collections
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="product-details">
            <section className="product-details-content">
                <div className="product-details-image">
                    <div className="product-image-placeholder">
                        <span>{product.category}</span>
                    </div>
                </div>

                <div className="product-details-info">
                    <span className="product-category">
                        {product.category}
                    </span>

                    <h1>{product.title}</h1>

                    <p className="product-price">
                        {product.price}
                    </p>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <p className="product-details-text">
                        {product.details}
                    </p>

                    <Link to="/contact" className="product-contact">
                        Inquire About This Piece
                    </Link>

                    <Link to="/collections" className="back-link">
                        ← Back to Collections
                    </Link>
                </div>
            </section>
        </main>
    );
}
