import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./PopupCard.scss";
import useAuth from "../hooks/useAuth";

function PopupCard({ stationDetails, available, setisOpenedFilteringMenu }) {
  const { user } = useAuth();
  const navigate = useNavigate();

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
      <div>{stationDetails?.station_adress}</div>
      <div>Borne n°{stationDetails?.id}</div>
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
