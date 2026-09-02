import { Link } from "react-router-dom";

export default function Button({
    children,
    to,
    href,
    type = "button",
    className = "",
    onClick,
}) {
    const classes = `button ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
        >
            {children}
        </button>
    );
}