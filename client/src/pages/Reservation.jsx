import "./Reservation.scss";
import { Form, useLocation } from "react-router-dom";
import { useState } from "react";

const hostUrl = import.meta.env.VITE_API_URL;

function Reservation() {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();

  const handleSubmit = async () => {
    const response = await fetch(`${hostUrl}/api/reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setBookings(data);
    console.info(bookings);
  };
  handleSubmit();

  return (
    <section className="reservation-container">
      <h1>Reservez votre borne</h1>
      <Form onSubmit={handleSubmit}>
        <p>adresse de la borne</p>
        <label className="duree" min="2024-06-07T00:00">
          durée
          <input type="time" />
        </label>
        <label className="starting-time" value={location?.state?.startingDate}>
          heure debut (actuelle)
          <input type="datetime-local" name="startingTime" />
        </label>
        <label>
          Heure de fin (actuelle + durée)
          <input
            className="ending-time"
            type="datetime-local"
            name="endingTime"
          />
        </label>

        <p>price</p>

        <button onClick={handleSubmit} type="submit">
          Réserver
        </button>
      </Form>
    </section>
  );
}

export default Reservation;
