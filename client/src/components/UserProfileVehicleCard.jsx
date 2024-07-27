import { useEffect, useState } from "react";
import useAuth from "../utils/useAuth";
import plugsList from "../constants/plugsList";

const hostUrl = import.meta.env.VITE_API_URL;

function UserProfileVehicleCard() {
  const { user } = useAuth();

  const initialFormVehicle = { brand: "", model: "", year: "", powerVoltage: "", plugType: "" };

  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState(initialFormVehicle);

  const [showVehicles, setShowVehicles] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  const fetchVehicles = () => {
    fetch(`${hostUrl}/api/vehicle?userId=${user?.id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error(err));
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${hostUrl}/api/vehicle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newVehicle, user_id: user?.id }),
        credentials: "include",
      });
      if (response.status === 201) {
        setNewVehicle(initialFormVehicle);
        setShowAddVehicle(false);
        fetchVehicles();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (showVehicles) {
      fetchVehicles();
    }
  }, [showVehicles]);

  return (
    <>
      {" "}
      <div className="info-item">
        <h3>Mes véhicules</h3>
        <button
          type="button"
          className="button-sm-olive-outlined"
          onClick={() => setShowVehicles(!showVehicles)}
        >
          {showVehicles ? "Fermer" : "Voir"}
        </button>
      </div>
      {showVehicles && (
        <section className="vehicle-info">
          {!showAddVehicle && (
            <div>
              <button
                type="button"
                className="button-sm-olive-outlined"
                onClick={() => setShowAddVehicle(true)}
              >
                Ajouter un véhicule
              </button>
            </div>
          )}
          {showAddVehicle && (
            <form method="POST" onSubmit={handleAddVehicle}>
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
                  style={{ MozAppearance: "textfield", WebkitAppearance: "textfield" }}
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
                  {plugsList.map((plug) => (
                    <option value={plug.id} key={plug.id}>
                      {plug.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="button-sm-olive-outlined"
                  onClick={handleAddVehicle}
                >
                  Valider
                </button>
              </div>
            </form>
          )}
          <ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <p>Marque : {vehicle.brand}</p>
                <p>Modèle : {vehicle.model}</p>
                <p>Année : {vehicle.year}</p>
                <p>Tension : {vehicle.power_voltage}V</p>
                <p>
                  Type de prise :{" "}
                  {plugsList.find((el) => el.id === vehicle.plug_type)?.name || "Non renseigné"}{" "}
                </p>
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
        </section>
      )}
    </>
  );
}

export default UserProfileVehicleCard;
