import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./components/AuthProvider";
import { FavoritesProvider } from "./components/FavoritesProvider";
import { ProfilePanelProvider } from "./components/ProfilePanelProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <ProfilePanelProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProfilePanelProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
