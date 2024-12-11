import React from "react";
import { createRoot } from "react-dom/client";
import MainApp from "./components/MainApp";
import { Box } from "@mui/material";

// Get the root element
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Box sx={{ p: 4, minWidth: "500px" }}>
                <MainApp />
            </Box>
        </React.StrictMode>
    );
}
