import { useState } from "react";
import "../style/input.scss";
import "../style/button.scss";
import "../style/colors.scss";
import { hostUrl } from "./Register";
import "./AdminBackOffice.scss";
import useFetchData from "../utils/useFetchData";

function AdminBackOffice() {
  const [isEditing, setIsEditing] = useState({
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    email: "superwan32@gerson.fr",
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

  const messageFields = [
    { label: "Nom :", value: "name" },
    { label: "Adresse email :", value: "email" },
    { label: "Message :", value: "message" },
  ];

  const [messageFieldIsOpen, setMessageFieldIsOpen] = useState();
  const { fetchedData: messages } = useFetchData("messages", {});

  const [userFieldIsOpen, setUserFieldIsOpen] = useState();
  const { fetchedData: users } = useFetchData("users", { limit: 10 });

  const { fetchedData: chargingStations } = useFetchData("chargingStation", {
    limit: 10,
  });
  const [chargingStationsFieldIsOpen, setChargingStationsFieldIsOpen] =
    useState();

  const [chargingStationDetails, setChargingStationDetails] = useState([]);
  const [openDetailId, setOpenDetailId] = useState(null);

  return (
    <div className="page-container">
      <div className="user-profile">
        <header className="header">
          <h1>Espace administrateur</h1>
        </header>
        <section>
          <div className="info-item">
            <h3>Messagerie</h3>
            {messageFieldIsOpen &&
              messages.map((message) => (
                <ul key={message.id}>
                  {messageFields.map((field) => (
                    <li key={field.value}>
                      <h4>{field.label}</h4>
                      <p>{message[field.value]}</p>
                    </li>
                  ))}
                </ul>
              ))}
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => {
                setMessageFieldIsOpen(!messageFieldIsOpen);
              }}
            >
              {messageFieldIsOpen ? "Fermer" : "Voir"}
            </button>
          </div>
          <div className="info-item">
            <h3>Réservations en cours</h3>
            <button type="button" className="button-md-olive-outlined">
              Voir
            </button>
          </div>
          <div className="info-item">
            <h3>Utilisateurs</h3>
            {userFieldIsOpen &&
              users.map((user) => (
                <ul key={user.id}>
                  <li>
                    <p>Nom : {user.lastname}</p>
                    <p>Prénom : {user.firstname}</p>
                    <p>Adresse email : {user.email}</p>
                  </li>
                </ul>
              ))}
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => {
                setUserFieldIsOpen(!userFieldIsOpen);
              }}
            >
              {userFieldIsOpen ? "Fermer" : "Voir"}
            </button>
          </div>
          <div className="info-item">
            <h3>Bornes</h3>
            {chargingStationsFieldIsOpen &&
              chargingStations.map((chargingStation) => (
                <ul key={chargingStation.id}>
                  <li>
                    {openDetailId !== chargingStation.id &&
                      Object.entries({ ...chargingStation }).map(
                        ([key, value]) => <p key={key}>{`${key}: ${value}`}</p>
                      )}
                    {openDetailId === chargingStation.id &&
                      chargingStationDetails.length > 0 &&
                      chargingStationDetails.map((detail) => (
                        <div key={detail.id}>
                          <h4>Details:</h4>
                          {Object.entries(detail).map(([key, value]) => (
                            <p key={key}>{`${key}: ${value}`}</p>
                          ))}
                        </div>
                      ))}
                    <button
                      type="button"
                      className="button-md-olive-outlined"
                      onClick={() => {
                        if (openDetailId === chargingStation.id) {
                          setOpenDetailId(null);
                        } else {
                          fetch(
                            `${hostUrl}/api/charging-stations/${chargingStation.id}`
                          )
                            .then((r) => r.json())
                            .then((d) => {
                              setChargingStationDetails([d]);
                              setOpenDetailId(chargingStation.id);
                            });
                        }
                      }}
                    >
                      {openDetailId === chargingStation.id
                        ? "Fermer"
                        : "Détails"}
                    </button>
                  </li>
                </ul>
              ))}

            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => {
                setChargingStationsFieldIsOpen(!chargingStationsFieldIsOpen);
              }}
            >
              {chargingStationsFieldIsOpen ? "Réduire" : "Voir"}
            </button>
          </div>
        </section>
        <section className="personal-info">
          <h2>Informations de connexions</h2>
          <div className="info-item">
            <h3>Email : </h3>
            {isEditing.email ? (
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <h3>{formData.email}</h3>
            )}
            <input
              type="button"
              value={isEditing.email ? "Enregistrer" : "Modifier"}
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("email")}
            />
          </div>

          <div className="info-item">
            <h3>Mot de passe : </h3>
            {isEditing.password ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <h3>{formData.password}</h3>
            )}
            <input
              type="button"
              value={isEditing.password ? "Enregistrer" : "Modifier"}
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("password")}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminBackOffice;
