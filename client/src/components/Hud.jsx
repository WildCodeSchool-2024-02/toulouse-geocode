import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../utils/useAuth";
import LogoutButton from "./LogoutButton";
import "./Hud.scss";
import "./Navbar.scss";

function Hud({ setisOpenedFilteringMenu, isOpenedFilteringMenu }) {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const pathAndLabels = () => {
    const paths = ["/", "/contact", "/login", "/register"];
    const labels = ["Accueil", "Contact", "Connexion", "S'inscrire"];
    const arr = paths.map((path, i) => ({ path, label: labels[i] }));
    if (user) {
      arr[2] = { path: "/profile", label: "Espace utilisateur" };
      arr[3] = { path: "/login", label: "Se deconnecter" };
    }
    return arr;
  };

  return (
    <div className="hud-container">
      <motion.ul
        initial={{ y: -100, x: 200 }}
        animate={{ x: !isOpen ? 200 : -32 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}
        className="links-container"
        onClick={() => setIsOpen(!isOpen)}
      >
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
