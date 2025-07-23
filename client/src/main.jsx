import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Correct place to import
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/authContext";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";

// Correct rendering
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
