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
                <Route path="/" element={<Home />} />

                <Route
                    path="/collections"
                    element={<Collections />}
                />

                <Route
                    path="/collections/:slug"
                    element={<CollectionDetails />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/products/:slug"
                    element={<ProductDetails />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Route>
        </Routes>
    );
}