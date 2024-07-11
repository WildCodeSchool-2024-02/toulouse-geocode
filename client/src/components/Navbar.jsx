import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "../../public/logo.svg";

function Navbar() {
  const paths = ["/map", "/contact", "/connect", "/register"];
  const labels = ["Carte", "Contact", "Connexion", "S'inscrire"];

  const [animation, setAnimation] = useState("closed");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 700);
  const [isOpen, setIsOpen] = useState(false);
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();

  const path01Variants = {
    open: { d: "M3.06061 2.99999L21.0606 21" },
    closed: { d: "M0 9.5L24 9.5" },
  };
  const path02Variants = {
    open: { d: "M3.00006 21.0607L21 3.06064" },
    moving: { d: "M0 14.5L24 14.5" },
    closed: { d: "M0 14.5L15 14.5" },
  };

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 700);
    if (window.innerWidth >= 700) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClick = async () => {
    setAnimation("moving");
    setTimeout(() => {
      setAnimation(isOpen ? "closed" : "open");
    }, 200);
    setIsOpen(!isOpen);
    if (!isOpen) {
      await path02Controls.start(path02Variants.moving);
      path01Controls.start(path01Variants.open);
      path02Controls.start(path02Variants.open);
    } else {
      await path02Controls.start(path02Variants.moving);
      path01Controls.start(path01Variants.closed);
      path02Controls.start(path02Variants.closed);
    }
  };

  const variants = {
    open: { opacity: 1, y: "80px" },
    closed: { opacity: 0, y: "-100%" },
  };

  return (
    <>
      {!isDesktop ? (
        <div>
          <div className="navbar">
            <ul className="menu">
              <Link onClick={() => setIsOpen(false)} to="/">
                <img className="home" src={logo} alt="Logo upya" />
              </Link>
              <motion.nav
                className="mobile-nav"
                animate={isOpen ? "open" : "closed"}
                variants={variants}
              >
                {paths.map((path, index) => (
                  <li key={path}>
                    <NavLink onClick={() => setIsOpen(false)} to={path}>
                      {labels[index]}
                    </NavLink>
                  </li>
                ))}
              </motion.nav>
            </ul>
          </div>
          <button
            label="Toggle navigation menu"
            type="button"
            className="burger"
            onClick={onClick}
          >
            <svg width="35" height="35" viewBox="0 0 24 24">
              <motion.path
                stroke="#24331d"
                animate={animation}
                variants={path01Variants}
              />
              <motion.path
                stroke="#24331d"
                animate={animation}
                variants={path02Variants}
              />
            </svg>
          </button>
        </div>
      ) : (
        <div>
          <div className="navbar2">
            <ul className="menu2">
              <Link onClick={() => setIsOpen(false)} to="/">
                <img className="home" src={logo} alt="Logo upya" />
              </Link>
              <motion.nav>
                {paths.map((path, index) => (
                  <li key={path}>
                    <NavLink to={path}>{labels[index]}</NavLink>
                  </li>
                ))}
              </motion.nav>
            </ul>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default Navbar;
