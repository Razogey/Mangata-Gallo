import { useState } from "react";

import { Link } from "react-router-dom";

import Button from "../components/Button";

import SocialAuth from "../components/SocialAuth";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email =
                "Please enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
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
            <section
                className="auth-card"
                aria-labelledby="login-title"
            >
                <div className="auth-header">
                    <h1 id="login-title">
                        Welcome Back
                    </h1>

                    <p>
                        Sign in to your Mangata & Gallo account.
                    </p>
                </div>

                <form
                    id="login-form"
                    className="auth-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="form-group">
                        <label htmlFor="login-email">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="login-email"
                            name="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                                errors.email
                                    ? "login-email-error"
                                    : undefined
                            }
                        />

                        {errors.email && (
                            <p
                                className="auth-error"
                                id="login-email-error"
                                role="alert"
                            >
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(
                                errors.password
                            )}
                            aria-describedby={
                                errors.password
                                    ? "login-password-error"
                                    : undefined
                            }
                        />

                        {errors.password && (
                            <p
                                className="auth-error"
                                id="login-password-error"
                                role="alert"
                            >
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="auth-options">
                        <label
                            className="remember-me"
                            htmlFor="remember-me"
                        >
                            <input
                                type="checkbox"
                                id="remember-me"
                                name="remember"
                            />

                            <span>Remember me</span>
                        </label>

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="auth-button"
                    >
                        Login
                    </Button>

                    <SocialAuth />
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">
                            Create Account
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}