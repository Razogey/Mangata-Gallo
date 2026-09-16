import { apiRequest } from "./client";

export function getCollections() {
    return apiRequest("/collections/");
}