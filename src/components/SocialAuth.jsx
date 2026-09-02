import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";

export default function SocialAuth() {
    return (
        <div className="social-auth">
            <div className="social-auth-divider">
                <span>OR</span>
            </div>

            <div className="social-auth-buttons">
                <button
                    type="button"
                    className="social-auth-button btn-google"
                >
                    <FcGoogle className="social-auth-icon" />
                    Continue with Google
                </button>

                <button
                    type="button"
                    className="social-auth-button btn-facebook"
                >
                    <FaFacebookF className="social-auth-icon" />
                    Continue with Facebook
                </button>

                <button
                    type="button"
                    className="social-auth-button btn-apple"
                >
                    <FaApple className="social-auth-icon" />
                    Continue with Apple
                </button>
            </div>
        </div>
    );
}