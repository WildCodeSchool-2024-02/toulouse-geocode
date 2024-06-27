import { Link } from "react-router-dom";
import "./Connect.scss";
import "./button.scss";
import "./input.scss";
import logo from "../../public/logo.svg";

function Connect() {
  return (
    <div className="container">
      <div className="logo-menu">
        <i className="fi fi-ss-house-chimney" />
        <i className="fi fi-br-menu-burger" />
      </div>
      <div className="box-connect">
        <img className="logo-css" src={logo} alt="Logo du site WEB" />
        <div className="input-section">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            className="input-sm-gray-outlined"
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="pass"
            id="password"
            className="input-sm-gray-outlined"
          />
          <Link to="/connect" id="mdp">
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="button-page">
          <button type="button" className="button-lg-olive-fullfilled">
            Connexion
          </button>
          <Link to="/register" className="button-md-olive-outlined">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Connect;
