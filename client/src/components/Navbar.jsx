import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../../public/logo.svg";
import useAuth from "../utils/useAuth";
import LogoutButton from "./LogoutButton";

const hostUrl = import.meta.env.VITE_API_URL;

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const checkUserData = async () => {
      if (user) {
        try {
          const response = await fetch(`${hostUrl}/api/user/${user?.id}`, {
            credentials: "include",
          });
          if (response.status === 401) {
            logout();
            console.info("Unauthorized access - localStorage cleared");
          } else if (response.ok) {
            const data = await response.json();
            setUserDetails(data);
            console.info("User data:", data);
          } else {
            console.error("Error fetching user data:", response.status);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    checkUserData();
  }, [user]);

  const basePathsAndLabels = [{ path: "/map", label: "Carte" }];

  const adminPaths = [
    { path: "/profile", label: "Espace utilisateur" },
    { path: "/admin", label: "Espace administrateur" },
    { path: "/login", label: "Se deconnecter" },
  ];

  const userPaths = [
    { path: "/contact", label: "Contact" },
    { path: "/profile", label: "Espace utilisateur" },
    { path: "/login", label: "Se deconnecter" },
  ];

  const guestPaths = [
    { path: "/contact", label: "Contact" },
    { path: "/login", label: "Connexion" },
    { path: "/register", label: "S'inscrire" },
  ];

  const pathAndLabels = () => {
    if (user && userDetails) {
      const additionalPaths = userDetails.isAdmin ? adminPaths : userPaths;
      return [...basePathsAndLabels, ...additionalPaths];
    }
    return [...basePathsAndLabels, ...guestPaths];
  };

  const [isOpen, setIsOpen] = useState(false);
  const [device, setDevice] = useState(null);

  /// burger button
  const path01Variants = {
    open: { d: "M3.06061 2.99999L21.0606 21" },
    closed: { d: "M0 9.5L24 9.5" },
  };
  const path02Variants = {
    open: { d: "M3.00006 21.0607L21 3.06064" },
    moving: { d: "M0 14.5L24 14.5" },
    closed: { d: "M0 14.5L15 14.5" },
  };

  const [isAnimate, setIsAnimate] = useState("closed");
  const handleClickToAnimate = () => {
    setIsAnimate("moving");
    setTimeout(() => {
      setIsAnimate(isAnimate === "closed" ? "open" : "closed");
    }, 60);
  };
  /// burger button

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth > 768 ? setDevice("desktop") : setDevice("mobile");
    window.addEventListener("resize", handleResize);
    handleResize();
    setIsOpen(false);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`navbar ${location.pathname === "/map" && device === "mobile" ? "invisible" : ""}`}
    >
      <div className="logo-user-container">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img className="logo-upya" src={logo} alt="Logo upya" />
        </Link>
        {user && (
          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <p>Bienvenue {user.firstname}</p>
          </Link>
        )}
      </div>

      {device === "mobile" ? (
        <>
          <motion.ul
            onClick={handleClickToAnimate}
            initial={{ y: -150 }}
            animate={{ y: !isOpen ? -150 : 135 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className="links-container"
          >
            {pathAndLabels().map((el, index) => (
              <motion.li onClick={() => setIsOpen(!isOpen)} key={el.path}>
                {user && index === pathAndLabels().length - 1 ? (
                  <LogoutButton label={el.label} />
                ) : (
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={el.path}>
                    {el.label}
                  </NavLink>
                )}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div onClick={() => setIsOpen(!isOpen)} className="burger-button-container">
            <button
              onClick={handleClickToAnimate}
              type="button"
              className="burger-button"
              label="toggle-menu"
            >
              <svg width="2rem" height="2rem" viewBox="0 0 24 24">
                <motion.path stroke="#24331d" animate={isAnimate} variants={path01Variants} />
                <motion.path stroke="#24331d" animate={isAnimate} variants={path02Variants} />
              </svg>
            </button>
          </motion.div>
        </>
      ) : (
        <ul className="links-container">
          {pathAndLabels().map((el, index) => (
            <li key={el.path}>
              {user && index === pathAndLabels().length - 1 ? (
                <LogoutButton label={el.label} />
              ) : (
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={el.path}>
                  {el.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Navbar;
