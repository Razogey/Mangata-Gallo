import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Breadcrumbs />

            <Outlet />

            <Footer />
        </>
    );
}