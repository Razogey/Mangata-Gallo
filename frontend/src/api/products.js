import { apiRequest } from "./client";

export function getProducts() {
    return apiRequest("/products/");
}

export function getProductById(id) {
    return apiRequest(`/products/${id}/`);
}