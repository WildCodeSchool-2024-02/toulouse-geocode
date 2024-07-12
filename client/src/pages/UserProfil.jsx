import { useState } from "react";
import "./UserProfil.scss";
import "./input.scss";
import "./button.scss";
import "./colors.scss";

function UserProfile() {
  const [isEditing, setIsEditing] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    name: "Super",
    surname: "Wann",
    email: "superwan32@zizi.fr",
    password: "************",
  });

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="page-container">
      <div className="user-profile">
        <header className="header">
          <h1>Espace personnel</h1>
        </header>

        <div className="personal-info-container">
          <h2>Informations personnelles</h2>
        </div>
        <section className="personal-info">
          <div className="info-item">
            <span>Nom : </span>
            {isEditing.name ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <span>{formData.name}</span>
            )}
            <input
              type="button"
              value={isEditing.name ? "Enregistrer" : "Modifier"}
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("name")}
            />
          </div>

          <div className="info-item">
            <span>Prénom : </span>
            {isEditing.surname ? (
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <span>{formData.surname}</span>
            )}
            <input
              type="button"
              value={isEditing.surname ? "Enregistrer" : "Modifier"}
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("surname")}
            />
          </div>

          <div className="info-item">
            <span>Email : </span>
            {isEditing.email ? (
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <span>{formData.email}</span>
            )}
            <input
              type="button"
              value={isEditing.email ? "Enregistrer" : "Modifier"}
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("email")}
            />
          </div>

          <div className="info-item">
            <span>Mot de passe : </span>
            {isEditing.password ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <span>{formData.password}</span>
            )}
            <input
              type="button"
              value={isEditing.password ? "Enregistrer" : "Modifier"}
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("password")}
            />
          </div>

          <div className="info-item">
            <span>Mes réservations</span>
            <input
              type="button"
              value="Voir"
              className="button-md-olive-outlined"
            />
          </div>

          <div className="info-item">
            <span>Mes véhicules</span>
            <input
              type="button"
              value="Voir"
              className="button-md-olive-outlined"
            />
          </div>

          <div className="info-item">
            <span>Mes itinéraires</span>
            <input
              type="button"
              value="Voir"
              className="button-md-olive-outlined"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
