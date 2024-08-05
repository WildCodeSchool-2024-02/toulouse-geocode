import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";
import "./Hud.scss";
import "./Navbar.scss";

const hostUrl = import.meta.env.VITE_API_URL;

function Hud({ setisOpenedFilteringMenu, isOpenedFilteringMenu }) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetch(`${hostUrl}/api/users/${user?.id}`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const basePathsAndLabels = [{ path: "/map", label: "Carte" }];

  const adminPaths = [
    { path: "/profile", label: "Espace utilisateur" },
    { path: "/admin", label: "Espace administrateur" },
    { path: "/login", label: "Se déconnecter" },
  ];

  const userPaths = [
    { path: "/contact", label: "Contact" },
    { path: "/profile", label: "Espace utilisateur" },
    { path: "/login", label: "Se déconnecter" },
  ];

  const guestPaths = [
    { path: "/contact", label: "Contact" },
    { path: "/login", label: "Connexion" },
    { path: "/register", label: "S'inscrire" },
  ];

  const pathAndLabels = () => {
    if (user) {
      const additionalPaths = isAdmin ? adminPaths : userPaths;
      return [...basePathsAndLabels, ...additionalPaths];
    }
    return [...basePathsAndLabels, ...guestPaths];
  };

  return (
    <div className="hud-container">
      <motion.ul
        initial={{ y: -150, x: 200 }}
        animate={{ x: !isOpen ? 200 : -48 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}
        className="links-container"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user && <li className="welcome-message">Bienvenue {user.firstname}</li>}
        <li>
          {user ? (
            <button onClick={() => setisOpenedFilteringMenu(!isOpenedFilteringMenu)} type="button">
              Réserver
            </button>
          ) : (
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/login">
              Réserver
            </NavLink>
          )}
        </li>
        {pathAndLabels().map((el, index) => (
          <li key={el.path}>
            {user && index === 3 ? (
              <LogoutButton label={el.label} />
            ) : (
              <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={el.path}>
                {el.label}
              </NavLink>
            )}
          </li>
        ))}
      </motion.ul>

      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="burger-button"
        label="toggle-menu"
      >
        {" "}
        <i className="fi fi-rr-menu-dots" />
      </button>
    </div>
  );
}

Hud.propTypes = {
  setisOpenedFilteringMenu: PropTypes.func.isRequired,
  isOpenedFilteringMenu: PropTypes.bool.isRequired,
};

export default Hud;
