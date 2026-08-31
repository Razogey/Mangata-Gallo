import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Development from "./components/Development";
import NotFound from "./components/Notfound";

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
            <Route path="/collections" element={<Development />} />
            <Route path="/about" element={<Development />} />
            <Route path="/contact" element={<Development />} />

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