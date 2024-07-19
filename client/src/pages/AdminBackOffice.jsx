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

  const [messageFieldIsOpen, setMessageFieldIsOpen] = useState();

  const { fetchedData: messages } = useFetchData("messages", {});

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${hostUrl}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const [chargingStations, setChargingStations] = useState([]);

  const fetchCharginStations = async () => {
    try {
      const response = await fetch(
        `${hostUrl}/api/charging-stations/all-datas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setChargingStations(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
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
                  <li>
                    <ul>
                      <li>
                        <h4>Nom :</h4>
                        <p>{message.name}</p>
                      </li>
                      <li>
                        <h4>Adresse email :</h4>
                        <p>{message.email}</p>
                      </li>
                      <li>
                        <h4>Message :</h4>
                        <p>{message.message}</p>
                      </li>
                    </ul>
                  </li>
                </ul>
              ))}
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => {
                setMessageFieldIsOpen(!messageFieldIsOpen);
              }}
            >
              Voir
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
            {users.map((user) => (
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
              onClick={fetchUsers}
            >
              Voir
            </button>
          </div>
          <div className="info-item">
            <h3>Bornes</h3>
            {chargingStations.map((chargingStation) => (
              <ul key={chargingStation.id}>
                <li>
                  {Object.entries({ ...chargingStation }).map(
                    ([key, value]) => (
                      <p key={key}>{`${key}: ${value}`}</p>
                    )
                  )}
                  <button type="button" className="button-md-olive-outlined">
                    Modifier
                  </button>
                </li>
              </ul>
            ))}
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={fetchCharginStations}
            >
              Voir
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
