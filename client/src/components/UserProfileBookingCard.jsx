import { useEffect, useState } from "react";
import useAuth from "../utils/useAuth";
import { formatTime } from "../services/utils";

const hostUrl = import.meta.env.VITE_API_URL;

function UserProfileBookingCard() {
  const { user } = useAuth();

  const [bookingFieldIsOpen, setBookingFieldIsOpen] = useState();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(`${hostUrl}/api/reservation?userId=${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });
      const data = await response.json();
      setBookings(data);
    };
    if (user) {
      fetchBookings();
    }
  }, [user]);

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
    <>
      {" "}
      <div className="info-item">
        <h3>Mes réservations</h3>
        <button
          type="button"
          className="button-sm-olive-outlined"
          onClick={() => {
            setBookingFieldIsOpen(!bookingFieldIsOpen);
          }}
        >
          {bookingFieldIsOpen ? "Fermer" : "Voir"}
        </button>
      </div>
      <div className="user-reservations-container">
        {bookingFieldIsOpen &&
          bookings.map((booking) => (
            <div className="user-reservation-details" key={booking.id}>
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
      </div>
    </>
  );
}

export default UserProfileBookingCard;
