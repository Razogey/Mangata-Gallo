export default function Card({image, title, description, link}) {
    return (
        <article>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
            <a href="#">{link}</a>
        </article>
    )
}