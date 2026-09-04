import { useState } from "react";

import { Link } from "react-router-dom";

import Button from "../components/Button";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        setEmail(event.target.value);
        setError("");
        setIsSubmitted(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        setIsSubmitted(true);
    };

    return (
        <main className="auth-page">
            <section
                className="auth-card"
                aria-labelledby="forgot-password-title"
            >
                <div className="auth-header">
                    <h1 id="forgot-password-title">
                        Forgot Password
                    </h1>

                    <p>
                        Enter your email address to reset your password.
                    </p>
                </div>

                <form
                    id="forgot-password-form"
                    className="auth-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="form-group">
                        <label htmlFor="forgot-password-email">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="forgot-password-email"
                            name="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(error)}
                            aria-describedby={
                                error ? "forgot-password-email-error" : undefined
                            }
                        />

                        {error && (
                            <p
                                className="auth-error"
                                id="forgot-password-email-error"
                                role="alert"
                            >
                                {error}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="auth-button"
                    >
                        Send Reset Instructions
                    </Button>

                    {isSubmitted && (
                        <p
                            className="form-success"
                            role="status"
                            aria-live="polite"
                        >
                            If an account exists for this email, reset
                            instructions will be sent.
                        </p>
                    )}
                </form>

                <div className="auth-footer">
                    <p>
                        Remember your password?{" "}
                        <Link to="/login">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
