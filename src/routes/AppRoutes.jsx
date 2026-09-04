import {
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";

import { useEffect } from "react";

import Home from "../pages/Home";
import Collections from "../pages/Collections";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import CollectionDetails from "../pages/CollectionDetails";
import NotFound from "../pages/Notfound";
import Login from "../pages/Login";
import Register from "../pages/Register";

import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(
            window.location.search
        );

        const redirect = params.get("redirect");

        if (redirect) {
            navigate(redirect, { replace: true });
        }
    }, [navigate]);

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={<Home />}
                    handle={{ breadcrumb: "Home" }}
                />

                <Route
                    path="/collections"
                    element={<Collections />}
                    handle={{ breadcrumb: "Collections" }}
                />

                <Route
                    path="/collections/:slug"
                    element={<CollectionDetails />}
                    handle={{ breadcrumb: "Collection" }}
                />

                <Route
                    path="/about"
                    element={<About />}
                    handle={{ breadcrumb: "About" }}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                    handle={{ breadcrumb: "Contact" }}
                />

                <Route
                    path="/products/:slug"
                    element={<ProductDetails />}
                    handle={{ breadcrumb: "Product" }}
                />

                <Route
                    path="/login"
                    element={<Login />}
                    handle={{ breadcrumb: "Login" }}
                />

                <Route
                    path="/register"
                    element={<Register />}
                    handle={{ breadcrumb: "Register" }}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                    handle={{ breadcrumb: "Page Not Found" }}
                />
            </Route>
        </Routes>
    );
}