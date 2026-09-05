import { Link } from "react-router-dom";

export default function Development({ title }) {
    return (
        <main className="development">
            <div className="development-content">
                <h1>{title}</h1>

                <p>
                    We're currently working on this page.
                    Please check back soon.
                </p>

                <Link to="/">
                    Back to Home
                </Link>
            </div>
        </main>
    );
}