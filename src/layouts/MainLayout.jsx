import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";

export default function MainLayout() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Breadcrumbs />

            <Outlet />

            <Footer />
        </>
    );
}