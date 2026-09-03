import footerLogo from "../assets/logo/Asset 3@3x.png";

export default function Footer() {
    return (
        <footer>
            <div id="footer_logo">
                <img src={footerLogo} alt="Mangata and Gallo logo"/>
            </div>

            <div id="copyright">
                <p>
                    © 2026 Mangata & Gallo
                </p>
                <p>
                    Timeless jewelry, thoughtfully crafted for life's most meaningful moments.
                </p>
            </div>
        </footer>
    );
}