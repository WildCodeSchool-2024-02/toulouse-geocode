import { useState } from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import "./CustomGeocoder.scss";

function CustomGeocoder({ onLocationSelect }) {
  const [inputValue, setInputValue] = useState("");

  const loadOptions = (enteredValue, callback) => {
    if (!enteredValue) {
      return callback([]);
    }

    fetch(`https://nominatim.openstreetmap.org/search?q=${enteredValue}&format=jsonv2`)
      .then((r) => r.json())
      .then((d) => {
        const formattedOptions = d.map((item) => ({
          value: { lat: item.lat, lon: item.lon },
          label: item.display_name,
        }));
        callback(formattedOptions);
      })
      .catch(() => {
        callback([]);
      });
    return null;
  };

  return (
    <div className=" geocode-input-container">
      <AsyncSelect
        inputId="search-area"
        name="search-area"
        placeholder="Recherchez une adresse pour voir les bornes aux alentours"
        className="input-sm-gray-outlined"
        loadOptions={loadOptions}
        inputValue={inputValue}
        onInputChange={(val) => setInputValue(val)}
        onChange={(selectedOption) => {
          if (selectedOption) {
            onLocationSelect(selectedOption?.value);
          }
        }}
        noOptionsMessage={() => "Aucune adresse trouvée"}
        debounceTimeout={200}
        isClearable
      />{" "}
    </div>
  );
}

CustomGeocoder.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
};

export default CustomGeocoder;
