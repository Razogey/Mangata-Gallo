import { Link, useParams } from "react-router-dom";

import featuredProducts from "../data/featuredProducts";
import Button from "../components/Button";

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
                        <span className="back-link">←</span>
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
                    <img
                        src={product.image}
                        alt={product.title}
                    />
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

                    <Button to="/contact" className="product-contact">
                        Inquire About This Piece
                    </Button>

                    <Link to="/collections" className="back-link">
                        ← Back to Collections
                    </Link>
                </div>
            </section>
        </main>
    );
}
