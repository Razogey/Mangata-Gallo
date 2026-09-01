import { NavLink } from "react-router-dom";
import header_logo from "../assets/logo/Asset 1@3x.png";

export default function Header() {
    const navClass = ({ isActive }) => (isActive ? "active" : "");

    return (
        <header>
            <img
                className="logo"
                src={header_logo}
                alt="Mangata and Gallo logo"
            />

            <nav>
                <ul>
                    <li className="navbr">
                        <NavLink to="/" className={navClass}>
                            Home
                        </NavLink>
                    </li>

                    <li className="navbr">
                        <NavLink to="/collections" className={navClass}>
                            Collections
                        </NavLink>
                    </li>

                    <li className="navbr">
                        <NavLink to="/about" className={navClass}>
                            About Us
                        </NavLink>
                    </li>

                    <li className="navbr">
                        <NavLink to="/contact" className={navClass}>
                            Contact Us
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}