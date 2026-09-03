import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import SocialAuth from "../components/SocialAuth";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

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
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password.";
        } else if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match.";
        }

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>
                        Join Mangata & Gallo and discover
                        timeless elegance.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="form-group">
                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={
                                errors.name
                                    ? "register-name-error"
                                    : undefined
                            }
                        />

                        {errors.name && (
                            <p
                                className="auth-error"
                                id="register-name-error"
                                role="alert"
                            >
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                                errors.email
                                    ? "register-email-error"
                                    : undefined
                            }
                        />

                        {errors.email && (
                            <p
                                className="auth-error"
                                id="register-email-error"
                                role="alert"
                            >
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={
                                errors.password
                                    ? "register-password-error"
                                    : undefined
                            }
                        />

                        {errors.password && (
                            <p
                                className="auth-error"
                                id="register-password-error"
                                role="alert"
                            >
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(
                                errors.confirmPassword
                            )}
                            aria-describedby={
                                errors.confirmPassword
                                    ? "register-confirm-password-error"
                                    : undefined
                            }
                        />

                        {errors.confirmPassword && (
                            <p
                                className="auth-error"
                                id="register-confirm-password-error"
                                role="alert"
                            >
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="auth-button"
                    >
                        Create Account
                    </Button>

                    <SocialAuth />
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}