import logo from "../assets/images/logo.svg";
import "./Home.scss";

function Connect() {
  return (
    <div className="boxConnect">
      <img className="logoCSS" src={logo} alt="Logo du site WEB" />
      <label htmlFor="username">Nom d'utilisateur :</label>
      <input type="text" id="username" />
      <label htmlFor="password">Mot de passe :</label>
      <input type="text" id="password" />
      <p>Mot de passe oublié ?</p>
      <button type="button">Connexion</button>
      <button type="button">S'inscrire</button>
    </div>
  );
}

export default Connect;
