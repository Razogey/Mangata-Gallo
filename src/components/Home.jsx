import Banner from './Banner';
import Card from './Card';


export default function Home() {
    return (
        <>
            <Banner />

            <section className='cards' id='collections'>
                <Card
                    image='./images/engagement.jpg'
                    title='Engagement Rings'
                    description='Find the perfect symbol of your love with our collection of elegant diamond engagement rings,
                thoughtfully designed for your special moment.'
                    link='Discover Rings'
                />

                <Card
                    image='./images/wedding.jpg'
                    title='Wedding Collection'
                    description='Celebrate your journey together with beautifully crafted pieces designed to complement every
                unforgettable moment of your wedding day'
                    link='View Collection'
                />

                <Card 
                    image='./images/collection.jpg'
                    title='Luxury Jewelry Collections'
                    description="Explore Mangata & Gallo's signature designs, where classic elegance meets exceptional craftsmanship
                and modern sophistication."
                    link='Shop Jewelry'
                />
            </section>
        </>
    )
}