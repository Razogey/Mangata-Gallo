import { Link } from "react-router-dom";

export default function Card({
    image,
    title,
    description,
    link,
    path,
    className = "",
}) {
    return (
        <article className={className}>
            <img src={image} alt={title} loading="lazy" />

            <div className="card-content">
                <h2>{title}</h2>

                <p>{description}</p>

                <Link to={path}>
                    {link}
                </Link>
            </div>
        </article>
    );
}