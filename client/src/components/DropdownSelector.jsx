import PropTypes from "prop-types";

function DropdownSelector({
  selected,
  setSelected,
  dropdownDatasList,
  name,
  disabled = false,
}) {
  const handleInputChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <div>
      <select
        className={`${disabled ? "input-sm-gray-fullfilled" : "input-sm-gray-outlined"}`}
        id={name}
        name={name}
        value={selected}
        onChange={handleInputChange}
        disabled={disabled}
      >
        <option value="">--</option>
        {dropdownDatasList.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
}

DropdownSelector.propTypes = {
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setSelected: PropTypes.func.isRequired,
  dropdownDatasList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

DropdownSelector.defaultProps = {
  disabled: false,
};

export default DropdownSelector;
