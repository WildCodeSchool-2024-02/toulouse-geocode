import { Form, useNavigate } from "react-router-dom";
import "./Form.scss";
import "./Connect.scss";
import "./button.scss";
import "./input.scss";
import logo from "../../public/logo.svg";

function Connect() {
  const navigate = useNavigate();

  return (
    <div className="contact-form-div">
      <Form method="post">
        <img className="logo-css" src={logo} alt="Logo du site WEB" />

        <h1>Se connecter</h1>
        <section className="username">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            name="username"
            placeholder="Entrer votre nom d'utilisateur"
            className="input-sm-gray-outlined"
            required
          />
        </section>
        <section className="password">
          <label htmlFor="password">Mot de passe </label>
          <input
            id="password"
            name="password"
            placeholder="Entrer votre mot de passe"
            className="input-sm-gray-outlined"
            required
          />
        </section>
        <section>
          <input
            id="submit"
            type="submit"
            name="submit"
            value="Valider"
            className="button-lg-olive-fullfilled"
          />
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="button-md-olive-outlined"
          >
            S'inscrire
          </button>
        </section>
      </Form>
    </div>
  );
}

export default Connect;
