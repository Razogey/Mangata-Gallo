import { useEffect, useRef, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import Button from "../../components/Button/Button";
import SocialAuth from "../../components/SocialAuth";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submissionTimer = useRef(null);

    useEffect(() => {
        return () => {
            if (submissionTimer.current) {
                window.clearTimeout(submissionTimer.current);
            }
        };
    }, []);

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

        if (!formData.identifier.trim()) {
            newErrors.identifier =
                "Email or username is required.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        }

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        const newErrors = validateForm();

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setStatus("error");
            return;
        }

        setStatus("processing");
        setIsSubmitting(true);

        try {
            const currentUser = await login(
                formData.identifier,
                formData.password
            );

            console.log("Current User:", currentUser);

            setStatus("success");

            navigate(redirectPath, { replace: true });
        } catch (error) {
            console.error("Login error:", error);

            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
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
                        <label htmlFor="login-identifier">
                            Email or Username
                        </label>

                        <input
                            type="text"
                            id="login-identifier"
                            name="identifier"
                            autoComplete="username"
                            placeholder="Enter your email or username"
                            value={formData.identifier}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(
                                errors.identifier
                            )}
                            aria-describedby={
                                errors.identifier
                                    ? "login-identifier-error"
                                    : undefined
                            }
                        />

                        {errors.identifier && (
                            <p
                                className="auth-error"
                                id="login-identifier-error"
                                role="alert"
                            >
                                {errors.identifier}
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Logging in..."
                            : "Login"}
                    </Button>

                    {status === "processing" && (
                        <p
                            className="auth-status"
                            role="status"
                            aria-live="polite"
                        >
                            Signing you in...
                        </p>
                    )}

                    {status === "success" && (
                        <p
                            className="auth-status"
                            role="status"
                            aria-live="polite"
                        >
                            Login successful. Redirecting...
                        </p>
                    )}

                    {status === "error" && (
                        <p
                            className="auth-status auth-status-error"
                            role="alert"
                        >
                            Invalid username/email or password.
                        </p>
                    )}

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