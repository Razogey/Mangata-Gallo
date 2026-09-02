import { Link } from "react-router-dom";

import Button from "../components/Button";
import SocialAuth from "../components/SocialAuth";

export default function Login() {
    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>
                        Sign in to your Mangata & Gallo account.
                    </p>
                </div>

                <form className="auth-form">
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
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="auth-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                name="remember"
                            />
                            <span>Remember me</span>
                        </label>

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button type="submit" className="auth-button">
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