import { useEffect, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import "./Form.scss";
import "./button.scss";
import "./input.scss";
import "./Register.scss";

export const hostUrl = import.meta.env.VITE_API_URL;

function Register() {
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const responseData = useActionData();
  useEffect(() => {
    if (responseData) {
      navigate("/login", { state: { email: responseData } })
    }
  }, [responseData]);

  return (
    <div className="contact-form-div">
      <Form method="post" action="/register">
        <h1>Formulaire d'inscription</h1>
        <section className="lastname">
          <label htmlFor="lastname">Nom</label>
          <input
            id="lastname"
            name="lastname"
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
        <section className="email">
          <label htmlFor="email">Email </label>
          <input
            id="email"
            name="email"
            type="email"
            pattern="^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
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
            type="password"
            pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Entrer le mot de passe souhaité"
            className="input-sm-gray-outlined"
            minLength="8"
            required
          />
          <ul>
            <li>Le mot de passe doit comporter au moins :</li>
            <li>8 caractères</li>
            <li>1 lettre</li>
            <li>1 chiffre</li>
          </ul>
          <label htmlFor="password-check">Vérification du mot de passe</label>
          <input
            id="password-check"
            name="password-check"
            type="password"
            pattern={pwd}
            placeholder="Entrer à nouveau le mot passe"
            className="input-sm-gray-outlined"
            required
          />
        </section>
        <button type="submit" className="button-lg-olive-fullfilled">
          Valider
        </button>
      </Form>
      <Toaster />
    </div>

  );
}

export async function postNewUser({ request }) {
  const formData = await request.formData();
  const lastname = formData.get("lastname");
  const firstname = formData.get("firstname");
  const email = formData.get("email");
  const password = formData.get("password");

  const requestBody = {
    lastname,
    firstname,
    email,
    password,
  };
  try {
    const response = await fetch(`${hostUrl}/api/user`, {
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
    toast.success("Votre compte a été créé avec succès.", {
      duration: 4000,
      position: "bottom-right",
    });
    return requestBody.email
  } catch (e) {
    console.error(e.message);
    return { error: true };
  }
}

export default Register;
