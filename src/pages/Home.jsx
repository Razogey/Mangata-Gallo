import Banner from "../components/Banner";
import Card from "../components/Card";
import products from "../data/products";

export default function Home() {
    return (
        <>
            <Banner />

            <section className="cards" id="collections">
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
            </section>
        </>
    );
}