import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getProductById,
    updateProduct,
    updateProductVariant,
} from "../../api/products";

export default function AdminProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Product editing
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
    });
    const [saving, setSaving] = useState(false);

    // Variant editing
    const [editingVariantId, setEditingVariantId] = useState(null);

    const [variantForm, setVariantForm] = useState({
        sku: "",
        price: "",
        stock_quantity: "",
        is_active: true,
    });

    const [savingVariant, setSavingVariant] = useState(false);

    // Load product
    useEffect(() => {
        async function loadProduct() {
            try {
                const data = await getProductById(id);

                setProduct(data);

                setFormData({
                    name: data.name || "",
                    slug: data.slug || "",
                    description: data.description || "",
                });
            } catch (err) {
                console.error("Failed to load product:", err);
                setError("Unable to load product.");
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    // Product form
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError(null);

            const updatedProduct = await updateProduct(id, formData);

            setProduct(updatedProduct);

            setFormData({
                name: updatedProduct.name || "",
                slug: updatedProduct.slug || "",
                description: updatedProduct.description || "",
            });

            setEditing(false);
        } catch (err) {
            console.error("Failed to update product:", err);
            setError("Unable to update product.");
        } finally {
            setSaving(false);
        }
    }

    // Start variant editing
    function startVariantEdit(variant) {
        setEditingVariantId(variant.id);

        setVariantForm({
            sku: variant.sku || "",
            price: variant.price || "",
            stock_quantity: variant.stock_quantity ?? "",
            is_active: variant.is_active,
        });
    }

    // Variant form
    function handleVariantChange(event) {
        const { name, value, type, checked } = event.target;

        setVariantForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleVariantSubmit(event, variantId) {
        event.preventDefault();

        try {
            setSavingVariant(true);
            setError(null);

            await updateProductVariant(variantId, {
                sku: variantForm.sku,
                price: variantForm.price,
                stock_quantity: Number(variantForm.stock_quantity),
                is_active: variantForm.is_active,
            });

            // Reload product to get updated variant data
            const updatedProduct = await getProductById(id);

            setProduct(updatedProduct);

            setEditingVariantId(null);
        } catch (err) {
            console.error("Failed to update variant:", err);
            setError("Unable to update variant.");
        } finally {
            setSavingVariant(false);
        }
    }

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (error && !product) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    const primaryImage =
        product.images?.find((image) => image.is_primary) ||
        product.images?.[0];

    return (
        <section className="admin-page">
            <header className="admin-page-header">
                <p>Administration</p>
                <h1>{product.name}</h1>
            </header>

            {error && (
                <p className="admin-error">
                    {error}
                </p>
            )}

            {/* Product Details */}
            <div className="admin-product-details">
                {primaryImage && (
                    <div className="admin-product-image">
                        <img
                            src={primaryImage.image_url}
                            alt={
                                primaryImage.alt_text ||
                                product.name
                            }
                        />
                    </div>
                )}

                {editing ? (
                    <form
                        className="admin-product-form"
                        onSubmit={handleSubmit}
                    >
                        <label>
                            Name

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Slug

                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Description

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="6"
                            />
                        </label>

                        <div className="admin-product-actions">
                            <button
                                type="submit"
                                className="admin-primary-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                className="admin-secondary-button"
                                onClick={() =>
                                    setEditing(false)
                                }
                                disabled={saving}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="admin-product-info">
                        <div className="admin-detail-field">
                            <span>Name</span>

                            <strong>
                                {product.name}
                            </strong>
                        </div>

                        <div className="admin-detail-field">
                            <span>Slug</span>

                            <strong>
                                {product.slug}
                            </strong>
                        </div>

                        <div className="admin-detail-field">
                            <span>Category</span>

                            <strong>
                                {typeof product.category ===
                                "object"
                                    ? product.category?.name
                                    : product.category || "—"}
                            </strong>
                        </div>

                        <div className="admin-detail-field">
                            <span>Collection</span>

                            <strong>
                                {typeof product.collection ===
                                "object"
                                    ? product.collection?.title
                                    : product.collection || "—"}
                            </strong>
                        </div>

                        <div className="admin-detail-field">
                            <span>Status</span>

                            <strong>
                                {product.is_active
                                    ? "Active"
                                    : "Inactive"}
                            </strong>
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            {!editing && (
                <>
                    <div className="admin-product-description">
                        <h2>Description</h2>

                        <p>
                            {product.description ||
                                "No description available."}
                        </p>
                    </div>

                    <div className="admin-product-actions">
                        <button
                            type="button"
                            className="admin-primary-button"
                            onClick={() =>
                                setEditing(true)
                            }
                        >
                            Edit Product
                        </button>

                        <Link
                            to="/admin/products"
                            className="admin-secondary-button"
                        >
                            Back to Products
                        </Link>
                    </div>
                </>
            )}

            {/* Product Variants */}
            <div className="admin-product-variants">
                <div className="admin-section-header">
                    <div>
                        <p>Product Management</p>
                        <h2>Variants</h2>
                    </div>
                </div>

                {product.variants?.length > 0 ? (
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>SKU</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.variants.map(
                                    (variant) => (
                                        <tr key={variant.id}>
                                            {editingVariantId ===
                                            variant.id ? (
                                                <td colSpan="5">
                                                    <form
                                                        className="admin-variant-form"
                                                        onSubmit={(
                                                            event
                                                        ) =>
                                                            handleVariantSubmit(
                                                                event,
                                                                variant.id
                                                            )
                                                        }
                                                    >
                                                        <input
                                                            type="text"
                                                            name="sku"
                                                            value={
                                                                variantForm.sku
                                                            }
                                                            onChange={
                                                                handleVariantChange
                                                            }
                                                            placeholder="SKU"
                                                            required
                                                        />

                                                        <input
                                                            type="number"
                                                            name="price"
                                                            value={
                                                                variantForm.price
                                                            }
                                                            onChange={
                                                                handleVariantChange
                                                            }
                                                            min="0"
                                                            step="0.01"
                                                            placeholder="Price"
                                                            required
                                                        />

                                                        <input
                                                            type="number"
                                                            name="stock_quantity"
                                                            value={
                                                                variantForm.stock_quantity
                                                            }
                                                            onChange={
                                                                handleVariantChange
                                                            }
                                                            min="0"
                                                            placeholder="Stock"
                                                            required
                                                        />

                                                        <label className="admin-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                name="is_active"
                                                                checked={
                                                                    variantForm.is_active
                                                                }
                                                                onChange={
                                                                    handleVariantChange
                                                                }
                                                            />

                                                            Active
                                                        </label>

                                                        <div className="admin-variant-actions">
                                                            <button
                                                                type="submit"
                                                                className="admin-primary-button"
                                                                disabled={
                                                                    savingVariant
                                                                }
                                                            >
                                                                {savingVariant
                                                                    ? "Saving..."
                                                                    : "Save"}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="admin-secondary-button"
                                                                onClick={() =>
                                                                    setEditingVariantId(
                                                                        null
                                                                    )
                                                                }
                                                                disabled={
                                                                    savingVariant
                                                                }
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                </td>
                                            ) : (
                                                <>
                                                    <td>
                                                        <strong>
                                                            {
                                                                variant.sku
                                                            }
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {
                                                            variant.price
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            variant.stock_quantity
                                                        }
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={
                                                                variant.is_active
                                                                    ? "admin-status active"
                                                                    : "admin-status inactive"
                                                            }
                                                        >
                                                            {variant.is_active
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="admin-view-link"
                                                            onClick={() =>
                                                                startVariantEdit(
                                                                    variant
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No variants available.</p>
                )}
            </div>
        </section>
    );
}