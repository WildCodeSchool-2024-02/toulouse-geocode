import "./ContactForm.scss";
import { useNavigate } from "react-router-dom";

function ContactForm() {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate(-1)} type="button" className="back-button">
                &#x3c;
            </button>
            <div className="contactFormDiv">
                <form>
                    <h1>Contacter le support</h1>
                    <section className="name">
                        <label htmlFor="name">Nom</label>
                        <input id="name" name="name" placeholder="Entrer votre nom" />
                        <p>Requis</p>
                    </section>
                    <section className="email">
                        <label htmlFor="email">Email </label>
                        <input
                            id="email"
                            name="email"
                            placeholder="Entrer votre adresse mail"
                        />
                        <p>Requis</p>
                    </section>
                    <section>
                        <h2>Type de requête</h2>
                        <div className="supportButtons">
                            <input
                                id="assistance"
                                type="button"
                                name="assistance"
                                value="Assistance technique"
                                className="button-green"
                            />

                            <input
                                id="account"
                                type="button"
                                name="account"
                                value="Mon compte"
                                className="button-green"
                            />

                            <input
                                id="review"
                                type="button"
                                name="review"
                                value="Donner mon avis"
                                className="button-green"
                            />
                        </div>
                    </section>
                    <section>
                        <h2>Message </h2>
                        <textarea placeholder="Votre message" />
                        <p>500 caractères maximum</p>
                    </section>
                    <input
                        id="submit"
                        type="submit"
                        name="submit"
                        value="Valider"
                        className="button-green-main"
                    />
                </form>
            </div>
        </>
    );
}

export default ContactForm;