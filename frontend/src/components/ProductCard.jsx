import { Link } from "react-router-dom";

export default function ProductCard({
    product = {},
}) {
    const {
        slug,
        name,
        category,
        primary_image,
        is_active,
    } = product;

    if (!is_active) {
        return null;
    }

    const categoryName =
        typeof category === "object"
            ? category?.name
            : category;

    const imageUrl =
        typeof primary_image === "object"
            ? primary_image?.image_url
            : primary_image;

    const imageAlt =
        typeof primary_image === "object"
            ? primary_image?.alt_text
            : categoryName
                ? `${name} - ${categoryName}`
                : name || "Product";

    return (
        <article className="product-card">
            <img
                src={imageUrl}
                alt={imageAlt}
                loading="lazy"
            />

            <div className="product-card-content">
                {categoryName && (
                    <span>{categoryName}</span>
                )}

                <h3>{name}</h3>

                <Link
                    to={`/products/${slug}`}
                    aria-label={`View details for ${
                        name || "product"
                    }`}
                >
                    View Details
                </Link>
            </div>
        </article>
    );
}