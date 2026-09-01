import { NavLink } from 'react-router-dom';
import header_logo from "../assets/logo/Asset 1@3x.png";

export default function Header () {
    return (
        <header>
            <img className="logo" src={header_logo} alt="Mangata and Gallo logo" />

            <nav>
                <ul>
                    <li class="navbr">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                            Home
                        </NavLink>
                    </li>

                    <li class="navbr">
                        <NavLink to="/collections" className={({ isActive }) => (isActive ? "active" : "")}>Collections</NavLink>
                    </li>

                    <li class="navbr">
                        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                            About Us
                        </NavLink>
                    </li>

                    <li class="navbr">
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                            Contact Us
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}