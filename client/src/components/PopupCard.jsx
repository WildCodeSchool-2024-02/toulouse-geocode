import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./PopupCard.scss";
import useAuth from "../hooks/useAuth";
import plugsList from "../constants/plugsList";

function PopupCard({ stationDetails, available, setisOpenedFilteringMenu }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getPlugTypes = (data) => {
    if (!data) return {};
    const plugTypeIds = Object.keys(data).filter(
      (key) => key.startsWith("plug_type_") && data[key] === 1,
    );
    const plugTypeNames = plugTypeIds
      .map((id) => {
        const plug = plugsList.find((p) => p.id === id);
        return plug ? plug.name : null;
      })
      .filter((name) => name);

    return plugTypeNames;
  };

  const plugTypes = getPlugTypes(stationDetails);

  const handleClickToBook = () => {
    if (!available) {
      setisOpenedFilteringMenu(true);
      toast.loading("Veulliez completer les horaires de réservation", {
        duration: 4000,
        position: "top-left",
      });

      return;
    }

    const startingDate = available.split("&")[0].replace("startingDate=", "");
    const endingDate = available.split("&")[1].replace("endingDate=", "");

    if (new Date(endingDate) <= new Date(startingDate)) {
      toast.loading("L'heure de fin ne peut pas être antérieure à l'heure du début", {
        duration: 4000,
        position: "top-left",
      });
      return;
    }
    navigate("/reservation", {
      state: {
        stationId: stationDetails?.id,
        userId: user.id,
        startingDate,
        endingDate,
        adresse: stationDetails?.station_adress,
      },
    });
  };

  return (
    <>
      <h2>{stationDetails?.station_name}</h2>
      <p>{stationDetails?.station_adress}</p>
      <p>Borne n°{stationDetails?.id}</p>
      {plugTypes.length > 0 && (
        <ul>
          Prise :
          {plugTypes.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      )}
      {user ? (
        <button type="button" className="button-sm-olive-fullfilled" onClick={handleClickToBook}>
          Réserver
        </button>
      ) : (
        <Link to="/login" className="button-sm-olive-fullfilled">
          Connectez-vous pour réserver cette borne
        </Link>
      )}
      <Toaster />
    </>
  );
}

PopupCard.propTypes = {
  stationDetails: PropTypes.shape({
    station_name: PropTypes.string.isRequired,
    station_adress: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  available: PropTypes.string.isRequired,
  setisOpenedFilteringMenu: PropTypes.func.isRequired,
};
export default PopupCard;
