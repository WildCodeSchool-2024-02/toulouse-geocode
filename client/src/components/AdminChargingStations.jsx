import { useState } from "react";
import PropTypes from "prop-types";
import useFetchData from "../utils/useFetchData";

function AdminChargingStations({ hostUrl }) {
  const [offset, setOffset] = useState(0);
  const { fetchedData: chargingStations } = useFetchData("chargingStation", {
    limit: 10,
    offset,
  });

  const [chargingStationsFieldIsOpen, setChargingStationsFieldIsOpen] =
    useState(false);
  const [chargingStationDetails, setChargingStationDetails] = useState([]);
  const [openDetailId, setOpenDetailId] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSave = async (stationId, key, newValue) => {
    try {
      const response = await fetch(
        `${hostUrl}/api/charging-stations/${stationId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: newValue }),
        }
      );
      if (response.ok) {
        setChargingStationDetails((prevDetails) =>
          prevDetails.map((detail) => ({
            ...detail,
            [key]: newValue,
          }))
        );
        setEditMode(null);
      } else {
        console.error("Failed to update value");
      }
    } catch (error) {
      console.error("Error updating value:", error);
    }
  };

  const handleEdit = (key, value) => {
    setEditMode(`${chargingStations.id}-${key}`);
    setEditedValue(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = parseInt(searchValue, 10);
    if (value > 0) {
      setOffset(value - 1);
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditedValue("");
  };

  return (
    <div>
      <h3>Bornes</h3>
      <ul className="info-item">
        {chargingStationsFieldIsOpen && (
          <div className="search-station">
            <input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Chercher une borne"
              className="input-sm-gray-outlined"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="button-md-olive-outlined"
            >
              Rechercher
            </button>
          </div>
        )}
        {chargingStationsFieldIsOpen &&
          chargingStations.map((chargingStation) => (
            <li key={chargingStation.id}>
              <div className="charging-station-card">
                <div className="charging-station-text-container">
                  {openDetailId !== chargingStation.id &&
                    Object.entries({ ...chargingStation }).map(
                      ([key, value]) => (
                        <div key={key}>{`${key}: ${value}`}</div>
                      )
                    )}
                  {openDetailId === chargingStation.id &&
                    chargingStationDetails.length > 0 &&
                    chargingStationDetails.map((detail) => (
                      <div key={detail.id}>
                        <h3>Détails :</h3>
                        <ul>
                          {Object.entries(detail).map(([key, value]) => (
                            <li key={key}>
                              {editMode === `${chargingStations.id}-${key}` ? (
                                <>
                                  <h4>{key} =</h4>
                                  <input
                                    className="input-sm-gray-outlined"
                                    value={editedValue}
                                    onChange={(e) =>
                                      setEditedValue(e.target.value)
                                    }
                                  />
                                  <button
                                    type="button"
                                    className="button-sm-olive-outlined"
                                    onClick={() =>
                                      handleSave(
                                        chargingStation.id,
                                        key,
                                        editedValue
                                      )
                                    }
                                  >
                                    Valider
                                  </button>
                                  <button
                                    type="button"
                                    className="button-sm-gray-outlined"
                                    onClick={() => handleCancel()}
                                  >
                                    Annuler
                                  </button>
                                </>
                              ) : (
                                <>
                                  {`${key}: ${value}`}
                                  <button
                                    type="button"
                                    className="button-sm-olive-outlined"
                                    onClick={() => handleEdit(key, value)}
                                  >
                                    Modifier
                                  </button>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  className="button-md-olive-outlined"
                  onClick={() => {
                    if (openDetailId === chargingStation.id) {
                      setOpenDetailId(null);
                    } else {
                      fetch(
                        `${hostUrl}/api/charging-stations/${chargingStation.id}`
                      )
                        .then((r) => r.json())
                        .then((d) => {
                          setChargingStationDetails([d]);
                          setOpenDetailId(chargingStation.id);
                        });
                    }
                  }}
                >
                  {openDetailId === chargingStation.id ? "Fermer" : "Détails"}
                </button>
              </div>
            </li>
          ))}
        {chargingStationsFieldIsOpen && (
          <>
            <button
              type="button"
              className="button-md-olive-outlined"
              onClick={() => {
                setOffset((prevOffset) => prevOffset + 10);
              }}
            >
              Page suivante
            </button>
            {offset >= 10 && (
              <button
                type="button"
                className="button-md-olive-outlined"
                onClick={() => {
                  setOffset((prevOffset) => prevOffset - 10);
                }}
              >
                Page précédente
              </button>
            )}
          </>
        )}
        <button
          type="button"
          className="button-md-olive-outlined"
          onClick={() => {
            setChargingStationsFieldIsOpen(!chargingStationsFieldIsOpen);
          }}
        >
          {chargingStationsFieldIsOpen ? "Réduire" : "Voir"}
        </button>
      </ul>
    </div>
  );
}

export default AdminChargingStations;

AdminChargingStations.propTypes = {
  hostUrl: PropTypes.string.isRequired,
};
