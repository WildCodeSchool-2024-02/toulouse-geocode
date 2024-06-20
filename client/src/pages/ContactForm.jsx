import "./ContactForm.scss";
import "./button.scss";
import "./input.scss";
import "./radio.scss";
import { useNavigate, Form, redirect } from "react-router-dom";


const hostUrl = import.meta.env.VITE_API_URL;

function ContactForm() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="back-button"
      >
        &#x3c;
      </button>
      <div className="contactFormDiv">
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
            <div className="supportButtons">
              <label htmlFor="assistance">Assistance</label>
              <input
                id="assistance"
                type="radio"
                name="topic"
                value="Assistance technique"
                className="radio"
              />

              <label htmlFor="account">Mon compte</label>
              <input
                id="account"
                type="radio"
                name="topic"
                value="Mon compte"
                className="radio"
              />

              <label htmlFor="review">Donner mon avis</label>
              <input
                id="review"
                type="radio"
                name="topic"
                value="Donner mon avis"
                className="radio"
              />
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
    await response.json();

    if (response.ok) {
      return redirect(`/contact`);
    }
  } catch (e) {
    console.error(e.message);
  }
  return null;
}

export default ContactForm;
