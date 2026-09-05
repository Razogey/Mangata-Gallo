import { Link } from "react-router-dom";

import footerLogo from "../assets/logo/Asset 3@3x.png";
import contact from "../data/contact";

const email = contact.info.find((item) => item.title === "Email")?.value;
const phone = contact.info.find((item) => item.title === "Phone")?.value;
const location = contact.info.find((item) => item.title === "Location")?.value;

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link
                        to="/"
                        className="footer-logo"
                        aria-label="Mangata and Gallo home"
                    >
                        <img src={footerLogo} alt="Mangata and Gallo" />
                    </Link>

                    <p>
                        Timeless jewelry, thoughtfully crafted for life's most
                        meaningful moments.
                    </p>
                </div>

                <nav
                    className="footer-section"
                    aria-labelledby="footer-explore-title"
                >
                    <h2 id="footer-explore-title">Explore</h2>

                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/collections">Collections</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </nav>

                <nav
                    className="footer-section"
                    aria-labelledby="footer-account-title"
                >
                    <h2 id="footer-account-title">Account</h2>

                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Create Account</Link>
                        </li>
                    </ul>
                </nav>

                <div
                    className="footer-section footer-contact"
                    aria-labelledby="footer-contact-title"
                >
                    <h2 id="footer-contact-title">Contact</h2>

                    <address>
                        {email && (
                            <a href={`mailto:${email}`}>
                                {email}
                            </a>
                        )}
                        {phone && (
                            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                                {phone}
                            </a>
                        )}
                        {location && <span>{location}</span>}
                    </address>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Mangata &amp; Gallo</p>
            </div>
        </footer>
    );
}