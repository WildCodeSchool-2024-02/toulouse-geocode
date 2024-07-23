import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Reservation.scss";

const hostUrl = import.meta.env.VITE_API_URL;

function Reservation() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    userId,
    stationId: chargingStationId,
    startingDate: startingTime,
    endingDate: endingTime,
    adresse,
  } = location?.state || {};

  const coeff = 0.15;

  const getDuration = () => {
    if (!startingTime || !endingTime) {
      return 0;
    }
    const diffInMilis = new Date(endingTime).getTime() - new Date(startingTime).getTime();
    return Math.floor(diffInMilis / 60000);
  };
  const getPrice = () => (getDuration() * coeff).toFixed(2);

  const handleSubmit = async () => {
    const requestBody = {
      userId,
      chargingStationId,
      startingTime,
      endingTime,
      price: getPrice(),
      duration: getDuration(),
    };

    try {
      const response = await fetch(`${hostUrl}/api/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      const reservation = await response.json();

      if (!response.ok) {
        toast.error("Une erreur s'est produite - reservation non enregistrée", {
          duration: 4000,
          position: "bottom-right",
        });
        return null;
      }

      toast.success("Votre réservation à bien été enregistrée", {
        duration: 4000,
        position: "bottom-right",
      });
      console.info(reservation);
      return navigate("/map");
    } catch (e) {
      console.error(e.message);
      toast.error("Une erreur s'est produite - reservation non enregistrée", {
        duration: 4000,
        position: "bottom-right",
      });
    }
    return null;
  };

  return (
    <section className="reservation-container">
      <h1>Récapitulatif de votre réservation</h1>
      <div className="reservation-informations-container">
        <div className="reservation-information-container">
          <h3>Numéro de la borne: </h3>
          <p>{chargingStationId}</p>
        </div>
        <div className="reservation-information-container">
          <h3>Adresse: </h3>
          <p>{adresse}</p>
        </div>
        <div className="reservation-information-container">
          <h3>Heure de début: </h3>
          <p>{startingTime}</p>
        </div>
        <div className="reservation-information-container">
          <h3>Heure de fin: </h3>
          <p>{endingTime}</p>
        </div>
        <div className="reservation-information-container">
          <h3>Durée: </h3>
          <p>{getDuration()} minutes</p>
        </div>
        <div className="reservation-information-container">
          <h3>Prix: </h3>
          <p>{getPrice()} €</p>
        </div>
        <button onClick={handleSubmit} className="button-md-olive-fullfilled" type="button">
          Confirmer la réservation
        </button>
        <Link to="/map" className="button-md-olive-fullfilled">
          Annuler{" "}
        </Link>
      </div>
      <Toaster />
    </section>
  );
}

// export default Reservation;

// import { useLocation } from "react-router-dom";

// function Reservation() {
//   const location = useLocation();

//   return (
//     <>
//       <p>{location?.state?.startingDate}</p>
//       <p>{location?.state?.endingDate}</p>
//       <p>{location?.state?.userId}</p>
//       <p>{location?.state?.stationId}</p>
//     </>
//   );
// }

export default Reservation;
