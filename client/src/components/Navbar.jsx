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

  // burger button
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
  const handleClick = () => {
    setIsAnimate("moving");
    setTimeout(() => {
      setIsAnimate(isAnimate === "closed" ? "open" : "closed");
    }, 60);
  };
  // burger button end

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth > 768 ? setDevice("desktop") : setDevice("mobile");
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setIsOpen(false).reload()}>
        <img className="logo-upya" src={logo} alt="Logo upya" />
      </Link>
      {device === "mobile" ? (
        <>
          <motion.ul
            onClick={() => window.location.reload()}
            initial={{ y: -150 }}
            animate={{ y: !isOpen ? -150 : 135 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className="links"
          >
            {paths.map((path, index) => (
              <motion.li onClick={() => setIsOpen(!isOpen)} key={path}>
                <NavLink to={path}>{labels[index]}</NavLink>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div onClick={() => setIsOpen(!isOpen)}>
            <button
              onClick={handleClick}
              type="button"
              className="button-burger"
              label="toggle-menu"
            >
              <svg width="2rem" height="2rem" viewBox="0 0 24 24">
                <motion.path
                  stroke="#24331d"
                  animate={isAnimate}
                  variants={path01Variants}
                />
                <motion.path
                  stroke="#24331d"
                  animate={isAnimate}
                  variants={path02Variants}
                />
              </svg>
            </button>
          </motion.div>
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
