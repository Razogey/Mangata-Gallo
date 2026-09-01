import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./styles/navigation.css";
import "./styles/banner.css";
import "./styles/cards.css";
import "./styles/footer.css";
import "./styles/pages.css";
import "./styles/collections.css";
import "./styles/about.css";
import "./styles/contact.css";
import "./styles/product-details.css";

import Home from "./pages/Home";
import Collections from "./pages/Collections";
import NotFound from "./pages/Notfound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";

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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:slug" element={<ProductDetails />} />

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