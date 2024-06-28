import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Connect from "./pages/Connect";
import ContactForm, { postMessageToAdmin } from "./pages/ContactForm";
import Map from "./pages/Map";
import MapComponent from "./pages/MapComponent";
import Register from "./pages/Register";
import MapComponentU from "./pages/MapComponentU";

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
      fetch(`${hostUrl}/api/clusters`)
        .then((r) => r.json())
        .then((d) => d.filter((el, i) => el)),
  },
  {
    path: "/mapgl",
    element: <MapComponent />,
    loader: async () =>
      fetch(`${hostUrl}/api/charging-stations`)
        .then((r) => r.json())
        .then((d) => d.filter((el, i) => el)),
  },
  {
    path: "/mapglu",
    element: <MapComponentU />,
    loader: async () =>
      fetch(`${hostUrl}/api/charging-stations`)
        .then((r) => r.json())
        .then((d) => d.filter((el, i) => el)),
  },
  {
    path: "/contact",
    element: <ContactForm />,
    action: postMessageToAdmin,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
