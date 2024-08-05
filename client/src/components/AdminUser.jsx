import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../services/utils";

function AdminUser({ hostUrl }) {
  const [userFieldIsOpen, setUserFieldIsOpen] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${hostUrl}/api/users`, {
        credentials: "include",
      });
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, [hostUrl]);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${hostUrl}/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
      }
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  return (
    <div>
      <h3>Utilisateurs</h3>
      <div className="info-item">
        {userFieldIsOpen &&
          users.map((user) => (
            <ul key={user.id}>
              <li>
                <p>Nom : {user.lastname}</p>
                <p>Prénom : {user.firstname}</p>
                <p>Adresse email : {user.email}</p>
                <p>Date de création du compte: {formatDate(user.creation_date)}</p>
                <button
                  type="button"
                  className="button-sm-olive-outlined"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Supprimer
                </button>
              </li>
            </ul>
          ))}
        <button
          type="button"
          className="button-md-olive-outlined admin-back-office-buttons"
          onClick={() => {
            setUserFieldIsOpen(!userFieldIsOpen);
          }}
        >
          {userFieldIsOpen ? "Fermer" : "Voir"}
        </button>
      </div>
    </div>
  );
}

export default AdminUser;

AdminUser.propTypes = {
  hostUrl: PropTypes.string.isRequired,
};
