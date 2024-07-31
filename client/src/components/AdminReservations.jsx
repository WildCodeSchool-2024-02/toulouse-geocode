import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatTime } from "../services/utils";

function AdminReservations({ hostUrl }) {
  const [bookingFieldIsOpen, setBookingFieldIsOpen] = useState();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(`${hostUrl}/api/reservations`, {
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
      const response = await fetch(`${hostUrl}/api/reservations/${id}`, {
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
            <div className="admin-reservation-details" key={booking.id}>
              <p>Id : {booking.id}</p>
              <p>Adresse : {booking.station_adress}</p>
              <p>Durée : {booking.duration} minutes</p>
              <p>Début : {formatTime(booking.starting_time)}</p>
              <p>Fin : {formatTime(booking.ending_time)}</p>
              <p>Prix : {booking.price} €</p>
              <p>Id de la borne de recharge : {booking.charging_station_id}</p>
              <p>Id utilisateur : {booking.user_id}</p>
              <div className="button-container">
                <button
                  type="button"
                  className="button-sm-olive-outlined"
                  onClick={() => handleDeleteBooking(booking.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
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
