import { Link } from "react-router-dom";
import "../styles/banner.css";

export default function Banner({
    title,
    description,
    image,
    buttonText,
    buttonPath,
}) {
    return (
        <section
            className="banner"
            style={{
                backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0.55),
                    rgba(0, 0, 0, 0.55)
                ), url(${image})`,
            }}
        >
            <div className="banner-content">
                <h1>{title}</h1>

                <p>{description}</p>

                {buttonText && buttonPath && (
                    <Link to={buttonPath}>
                        {buttonText}
                    </Link>
                )}
            </div>
        </section>
    );
}