import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function AdminMessage({ hostUrl }) {
  const [messageFieldIsOpen, setMessageFieldIsOpen] = useState();

  const messageFields = [
    { label: "Nom :", value: "name" },
    { label: "Adresse email :", value: "email" },
    { label: "Message :", value: "message" },
    { label: "Catégorie :", value: "topic" },
  ];

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`${hostUrl}/api/contact-messages`, {
        credentials: "include",
      });
      const data = await response.json();
      setMessages(data);
    };
    fetchMessages();
  }, [hostUrl]);

  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch(`${hostUrl}/api/contact-messages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete message: ${response.status}`);
      }
      setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  };

  return (
    <div>
      <h3>Messagerie</h3>
      <div className="info-item">
        {messageFieldIsOpen &&
          messages.map((message) => (
            <ul key={message.id}>
              {messageFields.map((field) => (
                <li key={field.value}>
                  <h4>{field.label}</h4>
                  <p>{message[field.value] || "Catégorie non renseignée"}</p>
                </li>
              ))}
              <div className="button-container">
                <a href={`mailto:${message.email}`} className="button-sm-olive-outlined">
                  Répondre
                </a>
                <button
                  type="button"
                  className="button-sm-olive-outlined"
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  Supprimer
                </button>
              </div>
            </ul>
          ))}
        <button
          type="button"
          className="button-md-olive-outlined admin-back-office-buttons"
          onClick={() => {
            setMessageFieldIsOpen(!messageFieldIsOpen);
          }}
        >
          {messageFieldIsOpen ? "Fermer" : "Voir"}
        </button>
      </div>
    </div>
  );
}

export default AdminMessage;

AdminMessage.propTypes = {
  hostUrl: PropTypes.string.isRequired,
};
