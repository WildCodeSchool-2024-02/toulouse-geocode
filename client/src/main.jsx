import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Connect, { login } from "./pages/Connect";
import ContactForm, { postMessageToAdmin } from "./pages/ContactForm";
import Register, { postNewUser } from "./pages/Register";
import NavbarLayout from "./components/NavbarLayout";
import MapPage from "./pages/MapPage";
import UserProfile from "./pages/UserProfil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Connect />,
        action: login,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/contact",
        element: <ContactForm />,
        action: postMessageToAdmin,
      },
      {
        path: "/register",
        element: <Register />,
        action: postNewUser,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
