import { useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import "./Form.scss";
import "./Connect.scss";
import "../style/button.scss";
import "../style/input.scss";
import { Toaster } from "react-hot-toast";
import logo from "../../public/logo.svg";
import LoginButton from "../components/LoginButton";

function Connect() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(
    location.state ? location.state.email : ""
  );
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const requestBody = { email, password };

  return (
    <div className="contact-form-div">
      <Form method="post" onSubmit={handleSubmit}>
        <img className="logo" src={logo} alt="Logo du site WEB" />

        <h1>Se connecter</h1>
        <section className="email">
          <label htmlFor="email">Adresse email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Entrer votre Adresse email"
            className="input-sm-gray-outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>
        <section className="section-validate">
          <LoginButton requestBody={requestBody} />
        </section>
      </Form>
      <button
        type="button"
        onClick={() => navigate("/register")}
        className="button-md-olive-outlined"
      >
        S'inscrire
      </button>
      <Toaster />
    </div>
  );
}

export default Connect;
