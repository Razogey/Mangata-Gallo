import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import Card from "../../components/Card/Card";
import BannerImg from "../../assets/banner.jpg";
import { getCollections } from "../../api/collections";

export default function Home() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCollections() {
            try {
                const data = await getCollections();
                setCollections(data);
            } catch (err) {
                console.error("Failed to load collections:", err);
                setError("Unable to load collections.");
            } finally {
                setLoading(false);
            }
        }

        loadCollections();
    }, []);

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

                {loading && <p>Loading collections...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && (
                    <div className="cards" id="collections">
                        {collections.map((collection) => {
                            const primaryImage =
                                collection.images?.find(
                                    (image) => image.is_primary
                                ) || collection.images?.[0];

                            return (
                                <Card
                                    key={collection.id}
                                    image={primaryImage?.image_url}
                                    title={collection.title}
                                    description={collection.description}
                                    link="Explore Collection"
                                    path={`/collections/${collection.slug}`}
                                    className="home-card"
                                />
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}