import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function AdminReservations({ hostUrl }) {
  const [bookingFieldIsOpen, setBookingFieldIsOpen] = useState();

  const bookingFields = [
    { label: "Id :", value: "id" },
    { label: "Durée :", value: "duration" },
    { label: "Heure de début :", value: "starting_time" },
    { label: "Heure de fin :", value: "ending_time" },
    { label: "Prix :", value: "price" },
    { label: "Payé ?", value: "is_paid" },
    { label: "Id utilisateur :", value: "user_id" },
    { label: "Id borne de recharge :", value: "charging_station_id" },
  ];

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(`${hostUrl}/api/reservation`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });
      const data = await response.json();
      setBookings(data);
    };
    fetchBookings();
  }, [hostUrl]);

  const handleDeleteBooking = async (id) => {
    try {
      const response = await fetch(`${hostUrl}/api/reservation/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete booking: ${response.status}`);
      }
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  };

  return (
    <div>
      <h3>Réservations en cours</h3>
      <div className="info-item">
        {bookingFieldIsOpen &&
          bookings.map((booking) => (
            <ul key={booking.id}>
              {bookingFields.map((field) => (
                <li key={field.value}>
                  <h4>{field.label}</h4>
                  <p>{booking[field.value]}</p>
                </li>
              ))}
              <div className="button-container">
                <button
                  type="button"
                  className="button-sm-olive-outlined"
                  onClick={() => handleDeleteBooking(booking.id)}
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
            setBookingFieldIsOpen(!bookingFieldIsOpen);
          }}
        >
          {bookingFieldIsOpen ? "Fermer" : "Voir"}
        </button>
      </div>
    </div>
  );
}

export default AdminReservations;

AdminReservations.propTypes = {
  hostUrl: PropTypes.string.isRequired,
};
