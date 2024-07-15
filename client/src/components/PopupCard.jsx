import PropTypes from "prop-types";
import "./PopupCard.scss";

function PopupCard({ stationDetails }) {
  return (
    <>
      <h2>{stationDetails?.station_name}</h2>
      <div>{stationDetails?.station_adress}</div>
      <button type="button" className="button-sm-olive-fullfilled">
        Reserver
      </button>
    </>
  );
}

PopupCard.propTypes = {
  stationDetails: PropTypes.shape({
    station_name: PropTypes.string.isRequired,
    station_adress: PropTypes.string.isRequired,
  }).isRequired,
};
export default PopupCard;
