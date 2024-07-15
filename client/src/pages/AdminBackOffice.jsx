import { useState } from "react";
import "../style/input.scss";
import "../style/button.scss";
import "../style/colors.scss";
import { hostUrl } from "./Register";

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

    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${hostUrl}/api/contact-messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

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
            console.error('Error fetching messages:', error);
        }
    };

    const [chargingStations, setChargingStations] = useState([]);

    const fetchCharginStations = async () => {
        try {
            const response = await fetch(`${hostUrl}/api/charging-stations/all-datas`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            setChargingStations(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
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
                        Messagerie
                        <button
                            type="button"
                            className="button-md-olive-outlined"
                            onClick={fetchMessages}
                        >Voir</button>
                        {messages.map((message) => (
                            <ul key={message.id}>
                                <li >
                                    <p>{message.name}</p>
                                    <p>{message.email}</p>
                                    <p>{message.message}</p>
                                </li>
                            </ul>
                        ))}
                    </div>
                    <div className="info-item">
                        Réservations en cours
                        <button
                            type="button"
                            className="button-md-olive-outlined"
                        >Voir</button>
                    </div>
                    <div className="info-item">
                        Utilisateurs
                        <button
                            type="button"
                            className="button-md-olive-outlined"
                            onClick={fetchUsers}
                        >Voir</button>
                        {users.map((user) => (
                            <ul key={user.id}>
                                <li >
                                    <p>{user.lastname}</p>
                                    <p>{user.firstname}</p>
                                    <p>{user.email}</p>
                                </li>
                            </ul>
                        ))}
                    </div>

                    <div className="info-item">
                        Bornes
                        <button
                            type="button"
                            className="button-md-olive-outlined"
                            onClick={fetchCharginStations}
                        >Voir</button>
                        {chargingStations.map((chargingStation) => (
                            <ul key={chargingStation.id}>
                                <li>
                                    {Object.entries({ ...chargingStation }).map(([key, value]) => (
                                        <p key={key}>{`${key}: ${value}`}</p>
                                    ))}
                                    <button type="button" className="button-md-olive-outlined">Modifier</button>
                                </li>
                            </ul>
                        ))}

                    </div>
                </section>
                <section className="personal-info">
                    <h2>Informations de connexions</h2>
                    <div className="info-item">
                        <span>Email : </span>
                        {isEditing.email ? (
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="input-sm-gray-outlined"
                            />
                        ) : (
                            <span>{formData.email}</span>
                        )}
                        <input
                            type="button"
                            value={isEditing.email ? "Enregistrer" : "Modifier"}
                            className="button-md-olive-outlined"
                            onClick={() => handleEditClick("email")}
                        />
                    </div>

                    <div className="info-item">
                        <span>Mot de passe : </span>
                        {isEditing.password ? (
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="input-sm-gray-outlined"
                            />
                        ) : (
                            <span>{formData.password}</span>
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