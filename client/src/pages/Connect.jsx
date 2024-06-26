import { Link } from "react-router-dom";
import "./Home.scss";
import logo from "../../public/logo.svg";

function Connect() {
  return (
    <div className="container">
      <div className="logo-menu">
        <i className="fi fi-ss-house-chimney" />
        <i className="fi fi-br-menu-burger" />
      </div>
      <div className="boxConnect">
        <img className="logoCSS" src={logo} alt="Logo du site WEB" />
        <div className="input">
          <label htmlFor="username" className="text-username">
            Nom d'utilisateur
          </label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password" className="text-password">
            Mot de passe
          </label>
          <input type="password" name="pass" id="password" />
          <Link to="/connect" id="mdp">
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="buttonPage">
          <button type="button" className="buttonConnect">
            Connexion
          </button>
          <Link to="/formulaire" className="buttonSignUp">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Connect;
