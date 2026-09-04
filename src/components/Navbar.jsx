import { useEffect, useRef, useState } from "react";

import {
    NavLink,
    Link,
    useLocation,
} from "react-router-dom";

import headerLogo from "../assets/logo/Asset 1@3x.png";

import navItems from "../data/navigation";

export default function Navbar() {
    const location = useLocation();

    const isAccountActive =
        location.pathname === "/login" ||
        location.pathname === "/register";

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuToggleRef = useRef(null);

    useEffect(() => {
        if (!isMenuOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                menuToggleRef.current?.focus();
            }
        };

        const previousOverflow = document.body.style.overflow;
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile) {
            document.body.style.overflow = "hidden";
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen]);

    const navClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    const accountClass = isAccountActive
        ? "navbar-action active"
        : "navbar-action";

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen((currentState) => !currentState);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-logo"
                    onClick={closeMenu}
                    aria-label="Mangata and Gallo home"
                >
                    <img
                        src={headerLogo}
                        alt="Mangata and Gallo"
                    />
                </Link>

                <button
                    ref={menuToggleRef}
                    className="menu-toggle"
                    type="button"
                    onClick={toggleMenu}
                    aria-label={
                        isMenuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>

                <nav
                    id="main-navigation"
                    aria-label="Main navigation"
                    className={`navbar-menu ${
                        isMenuOpen ? "open" : ""
                    }`}
                >
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.end}
                                    className={navClass}
                                    onClick={closeMenu}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="navbar-mobile-actions">
                        <button
                            type="button"
                            className="navbar-action"
                            disabled
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            className="navbar-action"
                            disabled
                        >
                            Cart
                        </button>

                        <NavLink
                            to="/login"
                            className={accountClass}
                            onClick={closeMenu}
                        >
                            Login
                        </NavLink>
                    </div>
                </nav>

                <div className="navbar-actions">
                    <button
                        type="button"
                        className="navbar-action"
                        disabled
                    >
                        Search
                    </button>

                    <button
                        type="button"
                        className="navbar-action"
                        disabled
                    >
                        Cart
                    </button>

                    <NavLink
                        to="/login"
                        className={accountClass}
                    >
                        Login
                    </NavLink>
                </div>

            </div>
        </header>
    );
}