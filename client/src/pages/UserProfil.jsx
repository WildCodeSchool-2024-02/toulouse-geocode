import { useState, useEffect } from "react";
import "./UserProfil.scss";
import "../style/input.scss";
import "../style/button.scss";
import "../style/colors.scss";

function UserProfile  ()  {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    battery_capacity: "",
    voltage: "",
    plug_type: "",
  });
  const [showVehicles, setShowVehicles] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    name: "Super",
    surname: "Wann",
    email: "superwan32@gerson.fr",
    password: "************",
  });

  const userId = 1; // ID de l'utilisateur actuellement connecté, à remplacer par une authentification réelle

  useEffect(() => {
    if (showVehicles) {
      fetch(`/api/vehicles/${userId}`)
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
    fetch("/api/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newVehicle, user_id: userId }),
    })
      .then(() => {
        setVehicles([...vehicles, newVehicle]);
        setNewVehicle({
          make: "",
          model: "",
          year: "",
          battery_capacity: "",
          voltage: "",
          plug_type: "",
        });
        setShowAddVehicle(false);
      })
      .catch((err) => console.error(err));
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
            <span>Nom :</span>
            {isEditing.name ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <span>{formData.name}</span>
            )}
            <button type = "button"
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("name")}
            >
              {isEditing.name ? "Enregistrer" : "Modifier"}
            </button>
          </div>
          <div className="info-item">
            <span>Prénom :</span>
            {isEditing.surname ? (
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleFormInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <span>{formData.surname}</span>
            )}
            <button type="button"
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("surname")}
            >
              {isEditing.surname ? "Enregistrer" : "Modifier"}
            </button>
          </div>
          <div className="info-item">
            <span>Email :</span>
            {isEditing.email ? (
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleFormInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <span>{formData.email}</span>
            )}
            <button type="button" 
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("email")}
            >
              {isEditing.email ? "Enregistrer" : "Modifier"}
            </button>
          </div>
          <div className="info-item">
            <span>Mot de passe :</span>
            {isEditing.password ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormInputChange}
                className="input-sm-gray-outlined"
              />
            ) : (
              <span>********</span>
            )}
            <button type="button"
              className="button-md-olive-outlined"
              onClick={() => handleEditClick("password")}
            >
              {isEditing.password ? "Enregistrer" : "Modifier"}
            </button>
          </div>
          <div className="info-item">
            <span>Mes réservations</span>
            <button type="button" className="button-md-olive-outlined">Voir</button>
          </div>
          <div className="info-item">
            <span>Mes itinéraires</span>
            <button type="button" className="button-md-olive-outlined">Voir</button>
          </div>
          <div className="info-item">
            <span>Mes véhicules</span>
            <button type="button"
              className="button-md-olive-outlined"
              onClick={() => setShowVehicles(!showVehicles)}
            >
              Voir
            </button>
          </div>
        </div>

        {showVehicles && (
          <section className="vehicle-info">
            <h2>Mes véhicules</h2>
            {vehicles.length === 0 ? (
              <div>
                <p>Aucun véhicule trouvé.</p>
                <button type="button"
                  className="button-md-olive-outlined"
                  onClick={() => setShowAddVehicle(true)}
                >
                  Ajouter votre premier véhicule
                </button>
              </div>
            ) : (
              <ul>
                {vehicles.map((vehicle) => (
                  <li key={vehicle.id}>
                    {vehicle.make} {vehicle.model} ({vehicle.year}) -{" "}
                    {vehicle.battery_capacity} kWh, {vehicle.voltage}V,{" "}
                    {vehicle.plug_type}
                  </li>
                ))}
              </ul>
            )}

            {showAddVehicle && (
              <div className="add-vehicle-form">
                <input
                  type="text"
                  name="make"
                  value={newVehicle.make}
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
                  name="battery_capacity"
                  value={newVehicle.battery_capacity}
                  onChange={handleInputChange}
                  placeholder="Capacité de la batterie (kWh)"
                  className="input-sm-gray-outlined"
                />
                <input
                  type="number"
                  name="voltage"
                  value={newVehicle.voltage}
                  onChange={handleInputChange}
                  placeholder="Tension (V)"
                  className="input-sm-gray-outlined"
                />
                <select
                  name="plug_type"
                  value={newVehicle.plug_type}
                  onChange={handleInputChange}
                  className="input-sm-gray-outlined"
                >
                  <option value="">Sélectionner le type de prise</option>
                  <option value="Type1">Type 1</option>
                  <option value="Type2">Type 2</option>
                  <option value="CCS">CCS</option>
                  <option value="CHAdeMO">CHAdeMO</option>
                </select>
                <button type="button"
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
};

export default UserProfile;
