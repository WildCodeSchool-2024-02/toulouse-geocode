import "./Home.scss";

function Formulaire() {
  return (
    <div className="full-input">
      <div className="title-form">
        <p id="titre-form">Formulaire d’inscription</p>
      </div>
      <label htmlFor="text" className="text-input">
        Prénom :
      </label>
      <input type="text" id="input-form" />
      <label htmlFor="text" className="text-input">
        Nom :
      </label>
      <input type="text" id="input-form" />
      <label htmlFor="text" className="text-input">
        Email :
      </label>
      <input type="text" id="input-form" />
      <p id="sous-titre">
        Nous enverrons des informations et des actualités à cette adresse.
      </p>
      <label htmlFor="password" className="text-input">
        Mot de passe :
      </label>
      <input type="password" id="input-form" />
      <label htmlFor="password" className="text-input">
        Confirmez votre mot de passe :
      </label>
      <input type="password" id="input-form" />
      <div className="buttonPage">
        <button type="button" className="buttonConnect-form">
          S'inscrire
        </button>
      </div>
    </div>
  );
}

export default Formulaire;
