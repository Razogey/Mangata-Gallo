import { useAuth } from "../../context/AuthContext";
import "./account.css";

export default function Account() {
    const { user } = useAuth();

    return (
        <main className="account-page">
            <section className="account-container">
                <div className="account-header">
                    <p className="account-eyebrow">My Account</p>
                    <h1>Welcome back</h1>
                    <p>
                        Manage your account information and personal details.
                    </p>
                </div>

                <div className="account-card">
                    <div className="account-card-header">
                        <h2>Personal Information</h2>
                    </div>

                    <div className="account-info">
                        <div className="account-field">
                            <span>Username</span>
                            <strong>{user?.username || "—"}</strong>
                        </div>

                        <div className="account-field">
                            <span>First Name</span>
                            <strong>{user?.first_name || "—"}</strong>
                        </div>

                        <div className="account-field">
                            <span>Last Name</span>
                            <strong>{user?.last_name || "—"}</strong>
                        </div>

                        <div className="account-field">
                            <span>Email</span>
                            <strong>{user?.email || "—"}</strong>
                        </div>

                        <div className="account-field">
                            <span>Role</span>
                            <strong>{user?.role || "Customer"}</strong>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}