import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

import "./components/Navbar/navigation.css";
import "./components/Banner/banner.css";
import "./components/Card/cards.css";
import "./components/Button/button.css";
import "./components/Footer/footer.css";
import "./pages/Development/development.css"
import "./pages/NotFound/notfound.css"
import "./pages/Collections/collections.css";
import "./pages/CollectionDetails/collection-details.css";
import "./pages/About/about.css";
import "./pages/Contact/contact.css";
import "./pages/ProductDetails/product-details.css";
import "./pages/Auth/auth.css";

export default function App() {
    const {user, isAuthenticated, loading} = useAuth()

    console.log("Auth State:", 
        {user,
        isAuthenticated,
        loading}
    )

    return <AppRoutes />;
}