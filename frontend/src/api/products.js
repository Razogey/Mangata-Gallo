import { apiRequest } from "./client";

export function getProducts() {
    return apiRequest("/products/");
}

export function getProductById(id) {
    return apiRequest(`/products/${id}/`);
}

export function createProduct(productData) {
    return apiRequest("/products/", {
        method: "POST",
        body: JSON.stringify(productData),
    });
}

export function updateProduct(id, productData) {
    return apiRequest(`/products/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(productData),
    });
}

export function updateProductVariant(id, variantData) {
    return apiRequest(`/product-variants/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(variantData),
    });
}