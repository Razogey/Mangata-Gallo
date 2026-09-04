import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";

export default function SocialAuth() {
    return (
        <div className="social-auth">
            <div
                className="social-auth-divider"
                aria-hidden="true"
            >
                <span>OR</span>
            </div>

            <div className="social-auth-buttons">
                <button
                    type="button"
                    className="social-auth-button btn-google"
                    disabled
                >
                    <FcGoogle
                        className="social-auth-icon"
                        aria-hidden="true"
                        focusable="false"
                    />
                    Continue with Google
                </button>

                <button
                    type="button"
                    className="social-auth-button btn-facebook"
                    disabled
                >
                    <FaFacebookF
                        className="social-auth-icon"
                        aria-hidden="true"
                        focusable="false"
                    />
                    Continue with Facebook
                </button>

                <button
                    type="button"
                    className="social-auth-button btn-apple"
                    disabled
                >
                    <FaApple
                        className="social-auth-icon"
                        aria-hidden="true"
                        focusable="false"
                    />
                    Continue with Apple
                </button>
            </div>
        </div>
    );
}