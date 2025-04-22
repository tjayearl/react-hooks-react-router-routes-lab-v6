// src/main.jsx
import "./index.css"; // Ensure this file exists
import React from 'react'; // Import React
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
// Wrap with StrictMode for development checks
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
