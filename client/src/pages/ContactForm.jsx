import "./ContactForm.scss";
import "./button.scss";
import "./input.scss";
import { useNavigate, Form, useActionData } from "react-router-dom";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";

const hostUrl = import.meta.env.VITE_API_URL;

function ContactForm() {
  const navigate = useNavigate();
  const actionResponse = useActionData();
  const closeModal = () => {
    navigate("/");
  };

  return (
    <>
      <BackButton />
      <div className="contact-form-div">
        <Form method="post">
          <h1>Contacter le support</h1>
          <section className="name">
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              name="name"
              placeholder="Entrer votre nom"
              className="input-sm-gray-outlined"
              required
            />
            <p>Requis</p>
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
            <p>Requis</p>
          </section>
          <section>
            <h2>Type de requête</h2>
            <div className="topic-buttons">
              <input
                id="assistance"
                type="radio"
                name="topic"
                value="Assistance technique"
              />
              <label htmlFor="assistance" className="button-md-olive-outlined">
                Assistance
              </label>
              <input
                id="account"
                type="radio"
                name="topic"
                value="Mon compte"
              />
              <label htmlFor="account" className="button-md-olive-outlined">
                Mon compte
              </label>
              <input
                id="review"
                type="radio"
                name="topic"
                value="Donner mon avis"
              />
              <label htmlFor="review" className="button-md-olive-outlined">
                Donner mon avis
              </label>
            </div>
          </section>
          <section>
            <h2>Message </h2>
            <textarea
              placeholder="Votre message"
              required
              id="message"
              name="message"
            />
            <p>500 caractères maximum</p>
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
            ? "Une erreur s'est produite lors de l'envoi du message."
            : "Votre message a été envoyé avec succès."
        }
      />
    </>
  );
}

export async function postMessageToAdmin({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const topic = formData.get("topic");

  const requestBody = {
    name,
    email,
    message,
    topic,
  };
  try {
    const response = await fetch(`${hostUrl}/api/contact`, {
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

export default ContactForm;
