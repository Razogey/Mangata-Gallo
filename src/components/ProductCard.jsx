import { Link } from "react-router-dom";

export default function ProductCard({
    image,
    title,
    category,
    description,
    price,
    slug,
}) {
    return (
        <article className="product-card">
            <img src={image} alt={title} />

            <div className="product-card-content">
                <span>{category}</span>

                <h3>{title}</h3>

                <p>{description}</p>

                {price && (
                    <p className="product-card-price">
                        {price}
                    </p>
                )}

                <Link to={`/products/${slug}`}>
                    View Details
                </Link>
            </div>
        </article>
    );
}