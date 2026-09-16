import { useAuth } from "../context/AuthContext";

export default function Account() {
    const { user } = useAuth();

    return (
        <main>
            <h1>My Account</h1>
            <p>Welcome, {user?.first_name || user?.username}.</p>
            <p>Email: {user?.email}</p>
        </main>
    );
}