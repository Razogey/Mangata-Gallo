import { Link } from "react-router-dom";

export default function Button({
    children,
    to,
    href,
    type = "button",
    className = "",
    onClick,
    disabled = false,
}) {
    const classes = `button ${className}`;

    if (to) {
        return (
            <Link
                to={to}
                className={classes}
                onClick={onClick}
            >
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a
                href={href}
                className={classes}
                onClick={onClick}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}