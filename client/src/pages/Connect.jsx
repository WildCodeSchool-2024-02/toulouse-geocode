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
        <section className="email">
          <label htmlFor="email">Adresse email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Entrer votre Adresse email"
            className="input-sm-gray-outlined"
            required
          />
        </section>
        <section className="password">
          <label htmlFor="password">Mot de passe </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Entrer votre mot de passe"
            className="input-sm-gray-outlined"
            required
          />
        </section>
        <section>
          <input
            onClick={() => navigate("/map")}
            id="submit"
            type="button"
            name="submit"
            value="Se connecter"
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
