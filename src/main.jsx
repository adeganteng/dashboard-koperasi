import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { ArrowUp } from "lucide-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster />
      <Button
        className="fixed bottom-4 right-4 z-20 rounded-full px-3 py-4 opacity-30 hover:opacity-100 transition-opacity"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Animasi scroll yang halus
          });
        }}
      >
        <ArrowUp size={20} />
      </Button>
    </ThemeProvider>
  </StrictMode>
);
