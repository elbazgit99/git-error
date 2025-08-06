import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import UserContext from "./context/userContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UserContext>
            <BrowserRouter>
                <App />
                <Toaster richColors closeButton />
            </BrowserRouter>
        </UserContext>
    </StrictMode>
);
