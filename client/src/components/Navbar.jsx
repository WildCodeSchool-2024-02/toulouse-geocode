import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../public/logo.svg";

function Navbar() {
  const paths = ["/", "/map", "/contact", "/connect", "/register"];
  const labels = ["Accueil", "Carte", "Contact", "Connexion", "S'inscrire"];

  return (
    <div className="navbar">
      <img src={logo} alt="Logo du site WEB" />

      <ul>
        {paths.map((path, index) => (
          <li key={path}>
            <NavLink to={path}>{labels[index]}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Navbar;
