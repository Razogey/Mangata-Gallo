import { Link } from "react-router-dom";

export default function Card({ image, title, description, link, path }) {
    return (
        <article>
            <img src={image} alt={title} />

            <h2>{title}</h2>

            <p>{description}</p>

            <Link to={path}>
                {link}
            </Link>
        </article>
    );
}