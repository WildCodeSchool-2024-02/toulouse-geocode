import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Connect from "./pages/Connect";
import Plug from "./pages/Plug";
import ContactForm, { postMessageToAdmin } from "./pages/ContactForm";
import Register, { postNewUser } from "./pages/Register";
import NavbarLayout from "./components/NavbarLayout";
import MapPage from "./pages/MapPage";
import UserProfile from "./pages/UserProfil";
import { AuthContextProvider } from "./context/AuthContext";
import AdminBackOffice from "./pages/AdminBackOffice";
import Reservation from "./pages/Reservation";

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
      {
        path: "/plug",
        element: <Plug />,
      },
      {
        path: "/admin",
        element: <AdminBackOffice />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/reservation",
        element: <Reservation />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
