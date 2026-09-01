import { Link } from "react-router-dom";

import about from "../data/about";

export default function About() {
    return (
        <main className="about-page">
            <section className="about-hero">
                <h1>{about.hero.title}</h1>
                <p>{about.hero.description}</p>
            </section>

            <section className="about-story">
                <h2>{about.story.title}</h2>
                <p>{about.story.description}</p>
            </section>

            <section className="about-craft">
                <h2>{about.craft.title}</h2>
                <p>{about.craft.description}</p>
            </section>

            <section className="about-philosophy">
                <h2>{about.philosophy.title}</h2>
                <p>{about.philosophy.description}</p>
            </section>

            <section className="about-values">
                <div className="section-heading">
                    <h2>{about.values.title}</h2>
                </div>

                <div className="values-grid">
                    {about.values.items.map((value) => (
                        <article className="value-card" key={value.title}>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="about-cta">
                <h2>{about.cta.title}</h2>
                <p>{about.cta.description}</p>

                <Link to={about.cta.path}>
                    {about.cta.link}
                </Link>
            </section>
        </main>
    );
}