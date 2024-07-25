import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ReservationDateSelector.scss";
import "./FilteringMenu.scss";

function ReservationDateSelector({ setQuery }) {
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const handleInputChange = (e, setDate) => {
    setQuery("");
    setDate(e.target.value);
  };

  useEffect(() => {
    if (startingDate && endingDate) {
      setQuery(
        `startingDate=${startingDate}&endingDate=${startingDate.split("T")[0]}T${endingDate}`
      );
    }
  }, [startingDate, endingDate]);

  return (
    <div className="reservation-date-selector-container">
      <h4>Disponibilité</h4>
      <div className="sections">
        <section>
          <label htmlFor="starting-date">Le : </label>
          <input
            id="starting-date"
            type="datetime-local"
            name="starting-date"
            value={startingDate}
            onChange={(e) => handleInputChange(e, setStartingDate)}
          />
        </section>
        <section>
          <label htmlFor="ending-date">Jusqu'a : </label>
          <input
            id="ending-date"
            type="time"
            name="ending-date"
            value={endingDate}
            onChange={(e) => handleInputChange(e, setEndingDate)}
          />
        </section>
      </div>
    </div>
  );
}

ReservationDateSelector.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default ReservationDateSelector;
