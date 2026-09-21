import { useEffect, useRef, useState } from "react";

import { useAuth } from "../../context/useAuth";

import {
    NavLink,
    Link,
    useLocation,
} from "react-router-dom";

import headerLogo from "../../assets/logo/Asset 1@3x.png";
import navItems from "../../data/navigation";

export default function Navbar() {
    const location = useLocation();

    const { isAuthenticated, logout } = useAuth();

    const isAccountActive =
        location.pathname.startsWith("/account");

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isMobileAccountMenuOpen, setIsMobileAccountMenuOpen] =
        useState(false);

    const [isDesktopAccountMenuOpen, setIsDesktopAccountMenuOpen] =
        useState(false);

    const menuToggleRef = useRef(null);

    const mobileAccountMenuRef = useRef(null);
    const desktopAccountMenuRef = useRef(null);

    const [scrolled, setScrolled] = useState(false);

    /* =========================
       Scroll
    ========================= */

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 20);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /* =========================
       Mobile Menu
    ========================= */

    useEffect(() => {
        if (!isMenuOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                setIsMobileAccountMenuOpen(false);

                menuToggleRef.current?.focus();
            }
        };

        const previousOverflow = document.body.style.overflow;

        const isMobile = window.matchMedia(
            "(max-width: 768px)"
        ).matches;

        if (isMobile) {
            document.body.style.overflow = "hidden";
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [isMenuOpen]);

    /* =========================
       Account Menu - Outside Click
    ========================= */

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedInsideMobile =
                mobileAccountMenuRef.current?.contains(
                    event.target
                );

            const clickedInsideDesktop =
                desktopAccountMenuRef.current?.contains(
                    event.target
                );

            if (
                !clickedInsideMobile &&
                !clickedInsideDesktop
            ) {
                setIsMobileAccountMenuOpen(false);
                setIsDesktopAccountMenuOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /* =========================
       Navigation Classes
    ========================= */

    const navClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    const accountClass = isAccountActive
        ? "navbar-action active"
        : "navbar-action";

    /* =========================
       Menu Actions
    ========================= */

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsMobileAccountMenuOpen(false);
    };

    const closeMobileAccountMenu = () => {
        setIsMobileAccountMenuOpen(false);
    };

    const closeDesktopAccountMenu = () => {
        setIsDesktopAccountMenuOpen(false);
    };

    const handleLogout = async () => {
        closeMenu();
        closeMobileAccountMenu();
        closeDesktopAccountMenu();

        await logout();
    };

    const toggleMenu = () => {
        setIsMenuOpen((currentState) => !currentState);

        setIsMobileAccountMenuOpen(false);
    };

    const toggleMobileAccountMenu = () => {
        setIsMobileAccountMenuOpen(
            (currentState) => !currentState
        );
    };

    const toggleDesktopAccountMenu = () => {
        setIsDesktopAccountMenuOpen(
            (currentState) => !currentState
        );
    };

    return (
        <header
            className={`navbar ${
                scrolled ? "navbar-scrolled" : ""
            }`}
        >
            <div className="navbar-container">

                {/* =========================
                    Logo
                ========================= */}

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

                {/* =========================
                    Mobile Menu Toggle
                ========================= */}

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

                {/* =========================
                    Main Navigation
                ========================= */}

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

                    {/* =========================
                        Mobile Actions
                    ========================= */}

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

                        {isAuthenticated ? (
                            <div
                                className="account-dropdown"
                                ref={mobileAccountMenuRef}
                            >
                                <button
                                    type="button"
                                    className={accountClass}
                                    onClick={
                                        toggleMobileAccountMenu
                                    }
                                    aria-expanded={
                                        isMobileAccountMenuOpen
                                    }
                                >
                                    Account

                                    <span aria-hidden="true">
                                        ▾
                                    </span>
                                </button>

                                {isMobileAccountMenuOpen && (
                                    <div className="account-dropdown-menu">
                                        <NavLink
                                            to="/account"
                                            onClick={
                                                closeMenu
                                            }
                                        >
                                            My Account
                                        </NavLink>

                                        <button
                                            type="button"
                                            onClick={
                                                handleLogout
                                            }
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className={accountClass}
                                onClick={closeMenu}
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </nav>

                {/* =========================
                    Desktop Actions
                ========================= */}

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

                    {isAuthenticated ? (
                        <div
                            className="account-dropdown"
                            ref={desktopAccountMenuRef}
                        >
                            <button
                                type="button"
                                className={accountClass}
                                onClick={
                                    toggleDesktopAccountMenu
                                }
                                aria-expanded={
                                    isDesktopAccountMenuOpen
                                }
                            >
                                Account

                                <span aria-hidden="true">
                                    ▾
                                </span>
                            </button>

                            {isDesktopAccountMenuOpen && (
                                <div className="account-dropdown-menu">
                                    <NavLink
                                        to="/account"
                                        onClick={
                                            closeDesktopAccountMenu
                                        }
                                    >
                                        My Account
                                    </NavLink>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            className={accountClass}
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </header>
    );
}