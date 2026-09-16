import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
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