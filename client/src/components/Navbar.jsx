import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../../public/logo.svg";

function Navbar() {
  const paths = ["/map", "/contact", "/login", "/register"];
  const labels = ["Carte", "Contact", "Connexion", "S'inscrire"];

  const [isOpen, setIsOpen] = useState(false);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth > 768 ? setDevice("desktop") : setDevice("mobile");

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setIsOpen(!isOpen)}>
        <img className="home" src={logo} alt="Logo upya" />
      </Link>
      {device === "mobile" ? (
        <>
          <motion.ul
            initial={{ y: -150 }}
            animate={{ y: !isOpen ? -150 : 135 }}
            className="links"
          >
            {paths.map((path, index) => (
              <motion.li onClick={() => setIsOpen(!isOpen)} key={path}>
                <NavLink to={path}>{labels[index]}</NavLink>
              </motion.li>
            ))}
          </motion.ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="burger"
            label="toggle-menu"
          >
            B
          </button>
        </>
      ) : (
        <ul className="links">
          {paths.map((path, index) => (
            <motion.li onClick={() => setIsOpen(!isOpen)} key={path}>
              <NavLink to={path}>{labels[index]}</NavLink>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Navbar;
