import { Form, redirect, useLocation, useNavigate } from "react-router-dom";
import "./Form.scss";
import "./Connect.scss";
import "./button.scss";
import "./input.scss";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../public/logo.svg";
import { hostUrl } from "./Register";

function Connect() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="contact-form-div">
      <Form method="post" action="/login">
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
            defaultValue={location.state ? location.state.email : ""}
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
          <button type="submit" className="button-lg-olive-fullfilled">
            Se connecter
          </button>
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

export async function login({ request }) {
  const formData = await request.formData();

  const requestBody = Object.fromEntries(formData);

  try {
    const response = await fetch(`${hostUrl}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      credentials: "include",
    });

    if (!response.ok) {
      toast.error("Oops. Une erreur s'est produite", {
        duration: 4000,
        position: "bottom-right",
      });

      return null;
    }
    toast.success("Connexion réussie", {
      duration: 4000,
      position: "bottom-right",
    });

    return redirect("/map");
  } catch (e) {
    console.error(e.message);
    return { error: true };
  }
}
