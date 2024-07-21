import { useState } from "react";
import PropTypes from "prop-types";
import DropdownSelector from "./DropdownSelector";
import "./FilteringMenu.scss";
import ReservationDateSelector from "./ReservationDateSelector";
import plugsList from "../constants/plugsList";

function FilteringMenu({ filterBy, setFilterBy, setQuery }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    isOpen && (
      <div className="filtering-menu-container">
        <header className="header-filter-menu">
          <h4>Filtrer par type de prise</h4>
          <button className="close-button" onClick={() => setIsOpen(false)} type="button">
            <i className="fi fi-tr-x" />{" "}
          </button>
        </header>
        <div className="inputs-filter-menu">
          <DropdownSelector
            selected={filterBy}
            setSelected={setFilterBy}
            dropdownDatasList={plugsList}
            name="plug-type"
          />
          <ReservationDateSelector setQuery={setQuery} />
        </div>
      </div>
    )
  );
}

FilteringMenu.propTypes = {
  filterBy: PropTypes.string.isRequired,
  setFilterBy: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default FilteringMenu;
