import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// 1. Import your API Data Context
import { UserContext } from "./components/Context Api/UserContext.jsx";
// 2. Import your Authentication Context
import { AuthProvider } from "./components/Context Api/AuthContext.jsx"; // Adjust this path!

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider> {/* Now useAuth() will work */}
      <UserContext> {/* Now your API data will work */}
        <App />
      </UserContext>
    </AuthProvider>
  </BrowserRouter>
);