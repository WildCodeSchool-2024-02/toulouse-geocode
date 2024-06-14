import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.scss";
import PropTypes from "prop-types";

function Map({ geojsonData }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((positions) => {
          const crd = positions.coords;
          const lat = crd.latitude;
          const lng = crd.longitude;
          setPosition([lat, lng]);
        });
      }
    };
    getLocation();
  }, []);

  if (!position) {
    return (
      <div className="loaderBox">
        <div className="loader" />
      </div>
    );
  }
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <Marker position={position}>
        <Popup>{position}</Popup>
      </Marker>
      <MarkerClusterGroup>
        <GeoJSON data={geojsonData} />
      </MarkerClusterGroup>
    </MapContainer>
  );
}

Map.propTypes = {
  geojsonData: PropTypes.shape.isRequired,
};

export default Map;
