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

  const [offset, setOffset] = useState(0);
  const { fetchedData: chargingStations } = useFetchData("chargingStation", {
    limit: 10,
    offset,
  });


  const [chargingStationsFieldIsOpen, setChargingStationsFieldIsOpen] =
    useState();

  const [chargingStationDetails, setChargingStationDetails] = useState([]);
  const [openDetailId, setOpenDetailId] = useState(null);

  const [editMode, setEditMode] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const handleEdit = (key, value) => {
    setEditMode(`${chargingStations.id}-${key}`);
    setEditedValue(value);
  };

  const handleSave = async (stationId, key, newValue) => {
    try {
      const response = await fetch(
        `${hostUrl}/api/charging-stations/${stationId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: newValue }),
        }
      );
      if (response.ok) {
        // Update the local state with the new value
        setChargingStationDetails((prevDetails) =>
          prevDetails.map((detail) => ({
            ...detail,
            [key]: newValue,
          }))
        );
        setEditMode(null);
      } else {
        console.error("Failed to update value");
      }
    } catch (error) {
      console.error("Error updating value:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditedValue("");
  };

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const value = parseInt(searchValue, 10);
    if (value > 0) {
      setOffset(value - 1);
    }
  };

  return (
    <div className="page-container">
      <div className="user-profile">
        <header className="header">
          <h1>Espace administrateur</h1>
        </header>
        <section>
          <h3>Messagerie</h3>
          <div className="info-item">
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
          <h3>Utilisateurs</h3>
          <div className="info-item">
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
          <h3>Bornes</h3>
          <ul className="info-item">
            {chargingStationsFieldIsOpen && (
              <div className="search-station">
                <input
                  type="number"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Chercher une borne"
                  className="input-sm-gray-outlined"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="button-md-olive-outlined"
                >
                  Rechercher
                </button>
              </div>
            )}
            {chargingStationsFieldIsOpen &&
              chargingStations.map((chargingStation) => (
                <li key={chargingStation.id}>
                  <div className="charging-station-card">
                    <div className="charging-station-text-container">
                      {openDetailId !== chargingStation.id &&
                        Object.entries({ ...chargingStation }).map(
                          ([key, value]) => (
                            <div key={key}>{`${key}: ${value}`}</div>
                          )
                        )}
                      {openDetailId === chargingStation.id &&
                        chargingStationDetails.length > 0 &&
                        chargingStationDetails.map((detail) => (
                          <div key={detail.id}>
                            <h3>Détails :</h3>
                            <ul>
                              {Object.entries(detail).map(([key, value]) => (
                                <li key={key}>
                                  {editMode ===
                                    `${chargingStations.id}-${key}` ? (
                                    <>
                                      <h4>{key} =</h4>
                                      <input
                                        className="input-sm-gray-outlined"
                                        value={editedValue}
                                        onChange={(e) =>
                                          setEditedValue(e.target.value)
                                        }
                                      />
                                      <button
                                        type="button"
                                        className="button-sm-olive-outlined"
                                        onClick={() =>
                                          handleSave(
                                            chargingStation.id,
                                            key,
                                            editedValue
                                          )
                                        }
                                      >
                                        Valider
                                      </button>
                                      <button
                                        type="button"
                                        className="button-sm-gray-outlined"
                                        onClick={() => handleCancel()}
                                      >
                                        Annuler
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      {`${key}: ${value}`}
                                      <button
                                        type="button"
                                        className="button-sm-olive-outlined"
                                        onClick={() => handleEdit(key, value)}
                                      >
                                        Modifier
                                      </button>
                                    </>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
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
                  </div>
                </li>
              ))}
            {chargingStationsFieldIsOpen && (
              <>
                <button
                  type="button"
                  className="button-md-olive-outlined"
                  onClick={() => {
                    setOffset((prevOffset) => prevOffset + 10);
                  }}
                >
                  Page suivante
                </button>
                {offset >= 10 && (
                  <button
                    type="button"
                    className="button-md-olive-outlined"
                    onClick={() => {
                      setOffset((prevOffset) => prevOffset - 10);
                    }}
                  >
                    Page précédente
                  </button>
                )}
              </>
            )}
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => {
                setChargingStationsFieldIsOpen(!chargingStationsFieldIsOpen);
              }}
            >
              {chargingStationsFieldIsOpen ? "Réduire" : "Voir"}
            </button>
          </ul>
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
