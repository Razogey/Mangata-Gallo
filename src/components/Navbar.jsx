import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import headerLogo from "../assets/logo/Asset 1@3x.png";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link
                    to="/"
                    className="navbar-logo"
                    onClick={closeMenu}
                >
                    <img
                        src={headerLogo}
                        alt="Mangata and Gallo"
                    />
                </Link>

                <button
                    className="menu-toggle"
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav
                    id="main-navigation"
                    aria-label="Main navigation"
                    className={`navbar-menu ${
                        isMenuOpen ? "open" : ""
                    }`}
                >
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={navClass}
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/collections"
                                className={navClass}
                                onClick={closeMenu}
                            >
                                Collections
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/about"
                                className={navClass}
                                onClick={closeMenu}
                            >
                                About Us
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/contact"
                                className={navClass}
                                onClick={closeMenu}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="navbar-actions">
                    <button
                        type="button"
                        className="navbar-action"
                        aria-label="Search"
                    >
                        Search
                    </button>

                    <button
                        type="button"
                        className="navbar-action"
                        aria-label="Shopping cart"
                    >
                        Cart
                    </button>
                </div>
            </div>
        </header>
    );
}