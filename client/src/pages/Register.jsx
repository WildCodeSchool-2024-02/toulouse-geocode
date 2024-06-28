import { Form, useActionData, useNavigate } from "react-router-dom";
import "./Form.scss";
import "./button.scss";
import "./input.scss";
import "./Register.scss";
import Modal from "../components/Modal";

const hostUrl = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();
  const actionResponse = useActionData();
  const closeModal = () => {
    navigate("/map");
  };

  return (
    <>
      <div className="contact-form-div">
        <Form method="post">
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
              minLength="8"
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
      <Modal
        isOpen={!!actionResponse}
        onClose={closeModal}
        message={
          actionResponse?.error
            ? "Une erreur s'est produite."
            : "Votre compte à été créé avec succès."
        }
      />
    </>
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
    });
    const responseBody = await response.json();

    if (response.ok) {
      return responseBody;
    }
  } catch (e) {
    console.error(e.message);
    return { error: true };
  }
  return null;
}

export default Register;
