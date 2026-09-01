import { Link } from "react-router-dom";
import BannerImg from "../assets/banner.jpg";

export default function Banner() {
    return (
        <section
            className="banner"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${BannerImg})`
            }}
        >
            <h1>
                Timeless Jewelry for Life's Most Beautiful Moments
            </h1>

            <p>
                Discover exquisite jewelry crafted with exceptional materials
                and timeless design, created to celebrate your most meaningful
                occasions.
            </p>

            <Link to="/collections">
                Explore Collection
            </Link>
        </section>
    );
}