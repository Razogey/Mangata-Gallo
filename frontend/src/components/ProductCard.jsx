import { Link } from "react-router-dom";

export default function ProductCard({
    product = {},
}) {
    const {
        image,
        title,
        category,
        description,
        price,
        slug,
    } = product;

    return (
        <article className="product-card">
            <img
                src={image}
                alt={category ? `${title} - ${category}` : title || "Product"}
                loading="lazy"
            />

            <div className="product-card-content">
                <span>{category}</span>

                <h3>{title}</h3>

                <p>{description}</p>

                {price && (
                    <p className="product-card-price">
                        {price}
                    </p>
                )}

                <Link
                    to={`/products/${slug}`}
                    aria-label={`View details for ${title || "product"}`}
                >
                    View Details
                </Link>
            </div>
        </article>
    );
}