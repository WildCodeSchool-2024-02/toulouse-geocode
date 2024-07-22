import { useState } from "react";

function AdminPersonnalInfo() {
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

  return (
    <div>
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
    </div>
  );
}

export default AdminPersonnalInfo;
