import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserProfil.scss";
import useAuth from "../hooks/useAuth";
import UserProfileBookingCard from "../components/UserProfileBookingCard";
import UserProfileVehicleCard from "../components/UserProfileVehicleCard";

const hostUrl = import.meta.env.VITE_API_URL;

function UserProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "************",
  });

  useEffect(() => {
    if (user) {
      fetch(`${hostUrl}/api/users/${user?.id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: "",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const [isEditing, setIsEditing] = useState({
    lastname: false,
    firstname: false,
    email: false,
    password: false,
  });

  const handleAddPersonnalInformation = () => {
    fetch(`${hostUrl}/api/users/${user?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
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

  return user ? (
    <div className="personal-space-container">
      <div className="user-profile">
        <header className="header">
          <h1>Espace personnel</h1>
        </header>

        <div className="personal-info-container">
          <h2>Informations</h2>
          <div className="info-item">
            <div>
              <h3>Nom :</h3>
              {isEditing.lastname ? (
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleFormInputChange}
                  className="input-sm-gray-outlined"
                />
              ) : (
                <p>{formData.lastname}</p>
              )}
            </div>
            {isEditing.lastname ? (
              <button
                type="button"
                className="button-sm-olive-outlined"
                onClick={() => {
                  handleAddPersonnalInformation();
                  handleEditClick("lastname");
                }}
              >
                Enregistrer
              </button>
            ) : (
              <button
                type="button"
                className="button-sm-olive-outlined"
                onClick={() => handleEditClick("lastname")}
              >
                Modifier
              </button>
            )}
          </div>
          <div className="info-item">
            <div>
              <h3>Prénom :</h3>
              {isEditing.firstname ? (
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleFormInputChange}
                  className="input-sm-gray-outlined"
                />
              ) : (
                <p>{formData.firstname}</p>
              )}
            </div>
            {isEditing.firstname ? (
              <button
                type="button"
                className="button-sm-olive-outlined"
                onClick={() => {
                  handleAddPersonnalInformation();
                  handleEditClick("firstname");
                }}
              >
                Enregistrer
              </button>
            ) : (
              <button
                type="button"
                className="button-sm-olive-outlined"
                onClick={() => handleEditClick("firstname")}
              >
                Modifier
              </button>
            )}
          </div>
          <div className="info-item">
            <div>
              <h3>Email :</h3>

              <p>{formData.email}</p>
            </div>
          </div>
          <div className="info-item">
            <div>
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
                <h3>********</h3>
              )}
            </div>
            {isEditing.password ? (
              <button
                type="button"
                className="button-sm-olive-outlined"
                onClick={() => {
                  handleAddPersonnalInformation();
                  handleEditClick("password");
                }}
              >
                Enregistrer
              </button>
            ) : (
              <button
                type="button"
                className="button-sm-olive-outlined"
                onClick={() => handleEditClick("password")}
              >
                Modifier
              </button>
            )}
          </div>
          <UserProfileBookingCard />
          <UserProfileVehicleCard />
        </div>
      </div>
    </div>
  ) : (
    <div className="admin-reservation-empty-container">
      <p>Connectez vous pour accéder à cette page.</p>
      <Link className="button-md-olive-outlined" to="/login">
        Connexion
      </Link>
    </div>
  );
}

export default UserProfile;
