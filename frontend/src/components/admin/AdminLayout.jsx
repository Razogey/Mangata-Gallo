import { Link, Outlet } from "react-router-dom";

import "../../styles/admin.css";

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <span>Mangata & Gallo</span>
                    <small>Administration</small>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin">
                        Dashboard
                    </Link>

                    <Link to="/admin/products">
                        Products
                    </Link>

                    <Link to="/admin/collections">
                        Collections
                    </Link>

                    <Link to="/admin/orders">
                        Orders
                    </Link>

                    <Link to="/admin/users">
                        Users
                    </Link>
                </nav>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
}