import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import SocialAuth from "../components/SocialAuth";

import { registerUser } from "../api/auth";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        if (!formData.username.trim()) {
            newErrors.username = "Username is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.first_name.trim()) {
            newErrors.first_name = "First name is required.";
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = "Last name is required.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters.";
        }

        if (!formData.confirm_password) {
            newErrors.confirm_password =
                "Please confirm your password.";
        } else if (
            formData.password !== formData.confirm_password
        ) {
            newErrors.confirm_password =
                "Passwords do not match.";
        }

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setStatus("error");
            return;
        }

        setErrors({});
        setStatus("processing");
        setIsSubmitting(true);

        try {
            await registerUser(formData);

            setStatus("success");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            const backendErrors = error.data;

            if (backendErrors && typeof backendErrors === "object") {
                setErrors(backendErrors);
            }

            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="auth-page">
            <section
                className="auth-card"
                aria-labelledby="register-title"
            >
                <div className="auth-header">
                    <h1 id="register-title">
                        Create Account
                    </h1>

                    <p>
                        Join Mangata & Gallo and discover
                        timeless elegance.
                    </p>
                </div>

                <form
                    id="register-form"
                    className="auth-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="form-group">
                        <label htmlFor="register-username">
                            Username
                        </label>

                        <input
                            type="text"
                            id="register-username"
                            name="username"
                            autoComplete="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(
                                errors.username
                            )}
                        />

                        {errors.username && (
                            <p
                                className="auth-error"
                                role="alert"
                            >
                                {Array.isArray(errors.username)
                                    ? errors.username.join(" ")
                                    : errors.username}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-email">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="register-email"
                            name="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(
                                errors.email
                            )}
                        />

                        {errors.email && (
                            <p
                                className="auth-error"
                                role="alert"
                            >
                                {Array.isArray(errors.email)
                                    ? errors.email.join(" ")
                                    : errors.email}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-first-name">
                            First Name
                        </label>

                        <input
                            type="text"
                            id="register-first-name"
                            name="first_name"
                            autoComplete="given-name"
                            placeholder="Enter your first name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(
                                errors.first_name
                            )}
                        />

                        {errors.first_name && (
                            <p
                                className="auth-error"
                                role="alert"
                            >
                                {Array.isArray(errors.first_name)
                                    ? errors.first_name.join(" ")
                                    : errors.first_name}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-last-name">
                            Last Name
                        </label>

                        <input
                            type="text"
                            id="register-last-name"
                            name="last_name"
                            autoComplete="family-name"
                            placeholder="Enter your last name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(
                                errors.last_name
                            )}
                        />

                        {errors.last_name && (
                            <p
                                className="auth-error"
                                role="alert"
                            >
                                {Array.isArray(errors.last_name)
                                    ? errors.last_name.join(" ")
                                    : errors.last_name}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="register-password"
                            name="password"
                            autoComplete="new-password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(
                                errors.password
                            )}
                        />

                        {errors.password && (
                            <p
                                className="auth-error"
                                role="alert"
                            >
                                {Array.isArray(errors.password)
                                    ? errors.password.join(" ")
                                    : errors.password}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-confirm-password">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="register-confirm-password"
                            name="confirm_password"
                            autoComplete="new-password"
                            placeholder="Confirm your password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(
                                errors.confirm_password
                            )}
                        />

                        {errors.confirm_password && (
                            <p
                                className="auth-error"
                                role="alert"
                            >
                                {Array.isArray(
                                    errors.confirm_password
                                )
                                    ? errors.confirm_password.join(" ")
                                    : errors.confirm_password}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="auth-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Creating Account..."
                            : "Create Account"}
                    </Button>

                    {status === "processing" && (
                        <p
                            className="auth-status"
                            role="status"
                            aria-live="polite"
                        >
                            Creating your account...
                        </p>
                    )}

                    {status === "success" && (
                        <p
                            className="auth-status"
                            role="status"
                            aria-live="polite"
                        >
                            Account created successfully.
                            Redirecting to login...
                        </p>
                    )}

                    {status === "error" && (
                        <p
                            className="auth-status auth-status-error"
                            role="alert"
                        >
                            Please correct the errors above and try again.
                        </p>
                    )}

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