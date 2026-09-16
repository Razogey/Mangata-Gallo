import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to load products:", err);
                setError("Unable to load products.");
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return (
        <section className="admin-page">
            <header className="admin-page-header admin-page-header-row">
                <div>
                    <p>Administration</p>
                    <h1>Products</h1>
                </div>

                <button type="button" className="admin-primary-button">
                    Add Product
                </button>
            </header>

            {loading && <p>Loading products...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Collection</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <strong>{product.name}</strong>
                                    </td>

                                    <td>
                                        {typeof product.category === "object"
                                            ? product.category?.name
                                            : product.category || "—"}
                                    </td>

                                    <td>
                                        {typeof product.collection === "object"
                                            ? product.collection?.title
                                            : product.collection || "—"}
                                    </td>

                                    <td>
                                        <span
                                            className={
                                                product.is_active
                                                    ? "admin-status active"
                                                    : "admin-status inactive"
                                            }
                                        >
                                            {product.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>

                                    <td>
                                        <Link
                                            to={`admin/products/${product.id}`}
                                            className="admin-view-link"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}