import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../public/logo.svg";

function Navbar() {
  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/map", label: "Carte" },
    { path: "/contact", label: "Contact" },
    { path: "/login", label: "Connexion" },
    { path: "/register", label: "S'inscrire" },
  ];

  return (
    <div className="navbar">
      <NavLink to="/">
        <img src={logo} alt="Logo du site WEB" />
      </NavLink>

      <ul>
        {navLinks.map(({ path, label }) => (
          <li key={path}>
            <NavLink to={path}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Navbar;
