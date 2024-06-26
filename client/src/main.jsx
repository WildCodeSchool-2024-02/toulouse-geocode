import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Connect from "./pages/Connect";
import Map from "./pages/Map";
import Formulaire from "./pages/Formulaire";

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
  },
  {
    path: "/formulaire",
    element: <Formulaire />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
