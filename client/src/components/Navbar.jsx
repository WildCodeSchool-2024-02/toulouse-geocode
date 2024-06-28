import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../public/logo.svg";

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo du site WEB" />

      <ul>
        <li>
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li>
          <NavLink to="/map">Carte</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/connect">Connexion</NavLink>
        </li>
        <li>
          <NavLink to="/register">S'inscrire</NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
