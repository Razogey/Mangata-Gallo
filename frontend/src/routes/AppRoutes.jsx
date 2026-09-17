import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import AdminRoute from "../components/admin/AdminRoute";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminProductDetails from "../pages/admin/AdminProductDetails";


import Account from "../pages/Account/Account";
import Home from "../pages/Home/Home";
import Collections from "../pages/Collections/Collections";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import CollectionDetails from "../pages/CollectionDetails/CollectionDetails";
import NotFound from "../pages/Notfound/Notfound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Main Website */}
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
                    path="/forgot-password"
                    element={<ForgotPassword />}
                    handle={{ breadcrumb: "Forgot Password" }}
                />

                {/* Customer Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/account"
                        element={<Account />}
                        handle={{ breadcrumb: "My Account" }}
                    />
                </Route>

                <Route
                    path="*"
                    element={<NotFound />}
                    handle={{ breadcrumb: "Page Not Found" }}
                />
            </Route>

            {/* Admin */}
            <Route element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />

                    <Route path="/admin/products" element={<AdminProducts />} />

                    <Route
                        path="/admin/products/:id"
                        element={<AdminProductDetails />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}