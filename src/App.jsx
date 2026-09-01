import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./styles/navigation.css";
import "./styles/banner.css";
import "./styles/cards.css";
import "./styles/footer.css";
import "./styles/pages.css";
import "./styles/collections.css";

import Home from "./pages/Home";
import Collections from "./pages/Collections";
import NotFound from "./pages/Notfound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Development from "./components/Development";

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
            <Route path="/collections" element={<Collections />} />
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