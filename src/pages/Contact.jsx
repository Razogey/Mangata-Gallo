import contact from "../data/contact";

export default function Contact() {
    return (
        <main className="contact-page">
            <section className="contact-hero">
                <h1>{contact.hero.title}</h1>
                <p>{contact.hero.description}</p>
            </section>

            <section className="contact-info">
                {contact.info.map((item) => (
                    <article className="contact-info-card" key={item.title}>
                        <h2>{item.title}</h2>
                        <p>{item.value}</p>
                    </article>
                ))}
            </section>

            <section className="contact-form-section">
                <div className="section-heading">
                    <h2>{contact.form.title}</h2>
                </div>

                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">
                            {contact.form.fields.name}
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            {contact.form.fields.email}
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">
                            {contact.form.fields.subject}
                        </label>

                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">
                            {contact.form.fields.message}
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            required
                        ></textarea>
                    </div>

                    <button type="submit">
                        {contact.form.button}
                    </button>
                </form>
            </section>

            <section className="contact-hours">
                <h2>{contact.hours.title}</h2>
                <p>{contact.hours.description}</p>
            </section>
        </main>
    );
}