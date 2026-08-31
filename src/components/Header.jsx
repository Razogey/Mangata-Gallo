import { Link } from 'react-router-dom';

export default function Header () {
    return (
        <header>
            <img className="logo" src="./images/logo/Asset 1@3x.png" alt="Mangata and Gallo logo" />

            <nav>
                <ul>
                    <li class="navbr">
                        <a ><Link to="/">Home</Link></a>
                    </li>

                    <li class="navbr">
                        <a>
                            <Link to="/Collections">Collections</Link>
                        </a>
                    </li>

                    <li class="navbr">
                        <a>
                            <Link to="/about">About Us</Link>
                        </a>
                    </li>

                    <li class="navbr">
                        <a>
                            <Link to="/contact">Contact Us</Link>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}