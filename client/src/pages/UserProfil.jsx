import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserProfil.scss";
import "../style/input.scss";
import "../style/button.scss";
import "../style/colors.scss";
import { hostUrl } from "./Register";
import useAuth from "../utils/useAuth";

function UserProfile() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const userId = user ? user.id : navigate("/login");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "************",
  });

  useEffect(() => {
    if (userId) {
      fetch(`${hostUrl}/api/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: data.firstname,
            surname: data.lastname,
            email: data.email,
            password: "",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [userId]);
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    userId,
    brand: "",
    model: "",
    year: "",
    powerVoltage: "",
    plugType: "",
  });
  const [showVehicles, setShowVehicles] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    if (showVehicles) {
      fetch(`${hostUrl}/api/vehicle/`)
        .then((res) => res.json())
        .then((data) => setVehicles(data))
        .catch((err) => console.error(err));
    }
  }, [showVehicles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddVehicle = () => {
    fetch(`${hostUrl}/api/vehicle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newVehicle, user_id: userId }),
      credentials: "include",
    })
      .then(() => {
        setVehicles([...vehicles, newVehicle]);
        setNewVehicle({
          brand: "",
          model: "",
          year: "",
          powerVoltage: "",
          plugType: "",
        });
        setShowAddVehicle(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteVehicle = async (id) => {
    try {
      const response = await fetch(`${hostUrl}/api/vehicle/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete vehicle: ${response.status}`);
      }
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      throw error;
    }
  };

  return (
    <div className="page-container">
      <div className="user-profile">
        <header className="header">
          <h1>Espace personnel</h1>
        </header>

        <div className="personal-info-container">
          <h2>Informations personnelles</h2>
          <div className="info-item">
            <h3>Nom :</h3>
            {isEditing.name ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <h3>{formData.name}</h3>
            )}
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("name")}
            >
              {isEditing.name ? "Enregistrer" : "Modifier"}
            </button>
          </div>
          <div className="info-item">
            <h3>Prénom :</h3>
            {isEditing.surname ? (
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleFormInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <h3>{formData.surname}</h3>
            )}
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("surname")}
            >
              {isEditing.surname ? "Enregistrer" : "Modifier"}
            </button>
          </div>
          <div className="info-item">
            <h3>Email :</h3>
            {isEditing.email ? (
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleFormInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <h3>{formData.email}</h3>
            )}
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("email")}
            >
              {isEditing.email ? "Enregistrer" : "Modifier"}
            </button>
          </div>
          <div className="info-item">
            <h3>Mot de passe :</h3>
            {isEditing.password ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <p>********</p>
            )}
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("password")}
            >
              {isEditing.password ? "Enregistrer" : "Modifier"}
            </button>
          </div>
          <div className="info-item">
            <h3>Mes réservations</h3>
            <button type="button" className="button-md-olive-outlined">
              Voir
            </button>
          </div>
          <div className="info-item">
            <h2>Mes véhicules</h2>
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => setShowVehicles(!showVehicles)}
            >
              {showVehicles ? "Fermer" : "Voir"}
            </button>
          </div>
        </div>

        {showVehicles && (
          <section className="vehicle-info">
            {vehicles.length > 0 ? (
              <ul>
                {vehicles.map((vehicle) => (
                  <li key={vehicle.id}>
                    <p>Marque : {vehicle.brand}</p>
                    <p>Modèle : {vehicle.model}</p>
                    <p>Année : {vehicle.year}</p>
                    <p>Tension : {vehicle.power_voltage}V</p>
                    <p>Type de prise : {vehicle.plug_type}</p>
                    <button
                      type="button"
                      className="button-sm-olive-outlined"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      Supprimer le véhicule
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun véhicule trouvé.</p>
            )}
            <div>
              <button
                type="button"
                className="button-md-olive-outlined"
                onClick={() => setShowAddVehicle(true)}
              >
                Ajouter un véhicule
              </button>
            </div>
            {showAddVehicle && (
              <div className="add-vehicle-form">
                <input
                  type="text"
                  name="brand"
                  value={newVehicle.brand}
                  onChange={handleInputChange}
                  placeholder="Marque"
                  className="input-sm-gray-outlined"
                />
                <input
                  type="text"
                  name="model"
                  value={newVehicle.model}
                  onChange={handleInputChange}
                  placeholder="Modèle"
                  className="input-sm-gray-outlined"
                />
                <input
                  type="number"
                  name="year"
                  value={newVehicle.year}
                  onChange={handleInputChange}
                  placeholder="Année"
                  className="input-sm-gray-outlined"
                />
                <input
                  type="number"
                  name="powerVoltage"
                  value={newVehicle.powerVoltage}
                  onChange={handleInputChange}
                  placeholder="Tension (V)"
                  className="input-sm-gray-outlined"
                />
                <select
                  name="plugType"
                  value={newVehicle.plugType}
                  onChange={handleInputChange}
                  className="input-sm-gray-outlined"
                >
                  <option value="">Sélectionner le type de prise</option>
                  <option value="Type1">Type 1</option>
                  <option value="Type2">Type 2</option>
                  <option value="CCS">CCS</option>
                  <option value="CHAdeMO">CHAdeMO</option>
                </select>
                <button
                  type="button"
                  className="button-md-olive-outlined"
                  onClick={handleAddVehicle}
                >
                  Ajouter véhicule
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
