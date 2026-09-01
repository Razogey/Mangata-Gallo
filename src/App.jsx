import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Development from "./components/Development";
import NotFound from "./pages/Notfound";

function AppRoutes() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect");

        if (redirect) {
            navigate(redirect, { replace: true });
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Development title="Our Collections" />} />
            <Route path="/about" element={<Development title="About Us" />} />
            <Route path="/contact" element={<Development title="Contact Us" />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default function App() {
    return (
        <>
            <Header />

            <AppRoutes />

            <Footer />
        </>
    );
}