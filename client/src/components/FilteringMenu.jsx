import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DropdownSelector from "./DropdownSelector";
import "./FilteringMenu.scss";
import ReservationDateSelector from "./ReservationDateSelector";
import plugsList from "../constants/plugsList";
import useAuth from "../utils/useAuth";

function FilteringMenu({ filterBy, setFilterBy, setQuery, isOpen, setIsOpen }) {
  const { user } = useAuth();

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
          {user ? (
            <ReservationDateSelector setQuery={setQuery} />
          ) : (
            <Link to="/login" className="button-sm-olive-fullfilled">
              Connectez-vous pour voir les disponibilités
            </Link>
          )}
        </div>
      </div>
    )
  );
}

FilteringMenu.propTypes = {
  filterBy: PropTypes.string.isRequired,
  setFilterBy: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default FilteringMenu;
