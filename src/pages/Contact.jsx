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

    const fieldsConfig = [
        { name: "name", type: "text", autoComplete: "name" },
        { name: "email", type: "email", autoComplete: "email" },
        { name: "subject", type: "text", autoComplete: "off" },
        { name: "message", type: "textarea", rows: 6 },
    ];

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
                className="contact-banner"
                title="Contact Us"
                description="We would love to hear from you. Get in touch with Mangata & Gallo."
                image={contactHeroImg}
            />

            <section
                className="contact-info"
                aria-label="Contact information"
            >
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

            <section
                className="contact-form-section"
                aria-labelledby="contact-form-title"
            >
                <div className="section-heading">
                    <h2 id="contact-form-title">
                        {contact.form.title}
                    </h2>
                </div>

                <form
                    id="contact-form"
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {fieldsConfig.map(({ name, type, autoComplete, rows }) => {
                        const isTextArea = type === "textarea";
                        const InputComponent = isTextArea ? "textarea" : "input";
                        const errorId = `contact-${name}-error`;

                        return (
                            <div className="form-group" key={name}>
                                <label htmlFor={`contact-${name}`}>
                                    {contact.form.fields[name]}
                                </label>

                                <InputComponent
                                    id={`contact-${name}`}
                                    name={name}
                                    type={!isTextArea ? type : undefined}
                                    rows={rows}
                                    autoComplete={autoComplete}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                    aria-invalid={Boolean(errors[name])}
                                    aria-describedby={
                                        errors[name] ? errorId : undefined
                                    }
                                />

                                {errors[name] && (
                                    <p
                                        className="form-error"
                                        id={errorId}
                                        role="alert"
                                    >
                                        {errors[name]}
                                    </p>
                                )}
                            </div>
                        );
                    })}

                    <Button type="submit">
                        {contact.form.button}
                    </Button>

                    {status === "success" && (
                        <p
                            className="form-success"
                            role="status"
                            aria-live="polite"
                        >
                            Your message has been sent successfully.
                        </p>
                    )}

                    {status === "error" && (
                        <p
                            className="form-status-error"
                            role="alert"
                            aria-live="assertive"
                        >
                            Please correct the errors above and try again.
                        </p>
                    )}
                </form>
            </section>

            <section
                className="contact-hours"
                aria-labelledby="contact-hours-title"
            >
                <h2 id="contact-hours-title">
                    {contact.hours.title}
                </h2>

                <p>{contact.hours.description}</p>
            </section>
        </main>
    );
}