import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

import "./styles/navigation.css";
import "./styles/banner.css";
import "./styles/cards.css";
import "./styles/footer.css";
import "./styles/pages.css";
import "./styles/collections.css";
import "./styles/about.css";
import "./styles/contact.css";
import "./styles/product-details.css";
import "./styles/collection-details.css";
import "./styles/button.css";
import "./styles/auth.css";

export default function App() {
    const {user, isAuthenticated, loading} = useAuth()

    console.log("Auth State:", 
        {user,
        isAuthenticated,
        loading}
    )

    return <AppRoutes />;
}