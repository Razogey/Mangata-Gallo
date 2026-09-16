import { apiRequest } from "./client";

export function registerUser(userData) {
  return apiRequest("/auth/register/", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function loginUser(identifier, password) {
  return apiRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify({
      identifier,
      password,
    }),
  });
}

export function getCurrentUser(accessToken) {
  return apiRequest("/auth/me/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function refreshAccessToken(refreshToken) {
  return apiRequest("/auth/token/refresh/", {
    method: "POST",
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
}

export function logoutUser(refreshToken, accessToken) {
  return apiRequest("/auth/logout/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
}