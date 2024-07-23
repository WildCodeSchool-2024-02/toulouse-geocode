import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function AdminPersonnalInfo({ user, navigate, hostUrl }) {
  const userIdDetails = user ? user.id : navigate("/login");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "************",
  });

  useEffect(() => {
    if (userIdDetails) {
      fetch(`${hostUrl}/api/user/${userIdDetails}`)
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
  }, [userIdDetails]);

  const [isEditing, setIsEditing] = useState({
    email: false,
    password: false,
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

AdminPersonnalInfo.defaultProps = {
  user: null,
};

AdminPersonnalInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  navigate: PropTypes.func.isRequired,
  hostUrl: PropTypes.string.isRequired,
};
