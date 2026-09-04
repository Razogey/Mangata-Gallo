import Banner from "../components/Banner";
import Card from "../components/Card";
import products from "../data/products";
import BannerImg from "../assets/banner.jpg";

export default function Home() {
    return (
        <main className="home-page">
            <Banner
                title="Timeless Jewelry for Life's Most Beautiful Moments"
                description="Discover exquisite jewelry crafted with exceptional materials and timeless design, created to celebrate your most meaningful occasions."
                image={BannerImg}
                buttonText="Explore Collection"
                buttonPath="/collections"
            />

            <section
                className="collections-section"
                aria-labelledby="collections-title"
            >
                <h2 id="collections-title" className="collections-title">
                    Our Collections
                </h2>

                <div className="cards" id="collections">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            description={product.description}
                            link={product.link}
                            path={product.path}
                            className="product-card"
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}