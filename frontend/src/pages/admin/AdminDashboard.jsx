import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import { getCollections } from "../../api/collections";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        collections: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadStats() {
            try {
                const [products, collections] = await Promise.all([
                    getProducts(),
                    getCollections(),
                ]);

                setStats({
                    products: products.length,
                    collections: collections.length,
                });
            } catch (err) {
                console.error("Failed to load dashboard stats:", err);
                setError("Unable to load dashboard data.");
            } finally {
                setLoading(false);
            }
        }

        loadStats();
    }, []);

    return (
        <section className="admin-dashboard">
            <header className="admin-page-header">
                <p>Administration</p>
                <h1>Dashboard</h1>
            </header>

            {loading && <p>Loading dashboard...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <div className="admin-stats">
                    <div className="admin-stat-card">
                        <span>Products</span>
                        <strong>{stats.products}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Collections</span>
                        <strong>{stats.collections}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Customers</span>
                        <strong>—</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Orders</span>
                        <strong>—</strong>
                    </div>
                </div>
            )}
        </section>
    );
}