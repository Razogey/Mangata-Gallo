import { Link } from "react-router-dom";

import Button from "../components/Button";
import SocialAuth from "../components/SocialAuth";

export default function Register() {
    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>
                        Join Mangata & Gallo and discover timeless
                        elegance.
                    </p>
                </div>

                <form className="auth-form">
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
                            required
                        />
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
                            autoComplete="new-password"
                            placeholder="Create a password"
                            required
                        />
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
                            required
                        />
                    </div>

                    <Button type="submit" className="auth-button">
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