import logo from "../assets/images/logo.svg";
import "./Home.scss";

function Connect() {
  return (
    <div className="boxConnect">
      <img className="logoCSS" src={logo} alt="Logo du site WEB" />
      <label>
        Nom d'utilisateur
        <input type="text" name="name" />
      </label>
      <label>
        Mot de passe
        <input type="text" name="name" />
      </label>
      <p>Mot de passe oublié ?</p>
      <button type="button">Connexion</button>
      <button type="button">S'inscrire</button>
    </div>
  );
}

export default Connect;
