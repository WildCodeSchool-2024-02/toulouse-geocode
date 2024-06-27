import { Form } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./Form.scss";
import "./button.scss";
import "./input.scss";
import "./Register.scss";

function Register() {
  return (
    <>
      <BackButton />
      <div className="contact-form-div">
        <Form method="post">
          <h1>Formulaire d'inscription</h1>
          <section className="lastname">
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              name="name"
              placeholder="Entrer votre nom"
              className="input-sm-gray-outlined"
              required
            />
          </section>
          <section className="firstname">
            <label htmlFor="firstname">Prénom</label>
            <input
              id="firstname"
              name="firstname"
              placeholder="Entrer votre prénom"
              className="input-sm-gray-outlined"
              required
            />
          </section>
          <section className="email">
            <label htmlFor="email">Email </label>
            <input
              id="email"
              name="email"
              placeholder="Entrer votre adresse mail"
              className="input-sm-gray-outlined"
              required
            />
          </section>
          <section className="password-section">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              placeholder="Entrer le mot de passe souhaité"
              className="input-sm-gray-outlined"
              required
            />
            <label htmlFor="password-check">Vérification du mot de passe</label>
            <input
              id="password-check"
              name="password-check"
              placeholder="Entrer à nouveau le mot passe"
              className="input-sm-gray-outlined"
              required
            />
          </section>
          <input
            id="submit"
            type="submit"
            name="submit"
            value="Valider"
            className="button-lg-olive-fullfilled"
          />
        </Form>
      </div>
    </>
  );
}

export default Register;
