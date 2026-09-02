import { useState } from "react";

import contact from "../data/contact";
import Button from "../components/Button";
import Banner from "../components/Banner";

import contactHeroImg from "../assets/contact-hero.jpg";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: "",
        }));

        setStatus("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required.";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required.";
        }

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setStatus("error");
            return;
        }

        setErrors({});
        setStatus("success");

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <main className="contact-page">
            <Banner
                title="Contact Us"
                description="We would love to hear from you. Get in touch with Mangata & Gallo."
                image={contactHeroImg}
            />

            <section className="contact-info">
                {contact.info.map((item) => (
                    <article
                        className="contact-info-card"
                        key={item.title}
                    >
                        <h2>{item.title}</h2>
                        <p>{item.value}</p>
                    </article>
                ))}
            </section>

            <section className="contact-form-section">
                <div className="section-heading">
                    <h2>{contact.form.title}</h2>
                </div>

                <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="form-group">
                        <label htmlFor="name">
                            {contact.form.fields.name}
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={
                                errors.name ? "name-error" : undefined
                            }
                        />

                        {errors.name && (
                            <p
                                className="form-error"
                                id="name-error"
                            >
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            {contact.form.fields.email}
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                                errors.email ? "email-error" : undefined
                            }
                        />

                        {errors.email && (
                            <p
                                className="form-error"
                                id="email-error"
                            >
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">
                            {contact.form.fields.subject}
                        </label>

                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.subject)}
                            aria-describedby={
                                errors.subject ? "subject-error" : undefined
                            }
                        />

                        {errors.subject && (
                            <p
                                className="form-error"
                                id="subject-error"
                            >
                                {errors.subject}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">
                            {contact.form.fields.message}
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={
                                errors.message ? "message-error" : undefined
                            }
                        />

                        {errors.message && (
                            <p
                                className="form-error"
                                id="message-error"
                            >
                                {errors.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit">
                        {contact.form.button}
                    </Button>

                    {status === "success" && (
                        <p className="form-success" role="status">
                            Your message has been sent successfully.
                        </p>
                    )}

                    {status === "error" && (
                        <p className="form-status-error" role="alert">
                            Please correct the errors above and try again.
                        </p>
                    )}
                </form>
            </section>

            <section className="contact-hours">
                <h2>{contact.hours.title}</h2>
                <p>{contact.hours.description}</p>
            </section>
        </main>
    );
}