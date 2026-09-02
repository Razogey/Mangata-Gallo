import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="not-found">
            <div>
                <div className="float-container">
                    <h1 className="wave-number">
                        <span className="num-1">4</span>
                        <span className="num-2">0</span>
                        <span className="num-3">4</span>
                    </h1>
                    <div className="shadow"></div>
                </div>

                <h2>Page Not Found</h2>
                <p>
                    The page you're looking for doesn't exist.
                </p>

                <Link to="/" className="btn-home">
                    Back to Home
                </Link>
            </div>
        </main>
    );
}