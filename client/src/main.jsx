import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Connect from "./pages/Connect";
import Map from "./pages/Map";
import ContactForm, { postMessageToAdmin } from "./pages/ContactForm";

const hostUrl = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/connect",
    element: <Connect />,
  },
  {
    path: "/map",
    element: <Map />,
    loader: async () =>
      fetch(`${hostUrl}/api/charging-stations/`)
        .then((r) => r.json())
        .then((d) => d),
  },
  {
    path: "/contact",
    element: <ContactForm />,
    action: postMessageToAdmin,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
