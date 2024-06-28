import { MapContainer, TileLayer, Marker, useMapEvent, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useMemo, useState, useRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import "./Map.scss";

const hostUrl = import.meta.env.VITE_API_URL;

function Map() {
  const globalClusters = useLoaderData();
  const [datas, setDatas] = useState([]);

  const [currentZoom, setCurrentZoom] = useState(null);
  const mapRef = useRef();

  const fetchDatas = (bounds, zoom) => {
    const { _northEast, _southWest } = bounds;
    const query =
      _northEast.lat + "§" + _northEast.lng + "§" + _southWest.lat + "§" + _southWest.lng;

    return fetch(`${hostUrl}/api/clusters/${query}`)
      .then((r) => r.json())
      .then((d) => {
        setDatas(d);
      });
  };

  const MapEventHandler = () => {
    useMapEvent("moveend", (e) => {
      const map = e.target;
      const zoom = map.getZoom();
      zoom >= 10 && fetchDatas(map.getBounds(), zoom);
    });

    useMapEvent("zoomend", (e) => {
      const map = e.target;
      setCurrentZoom(map.getZoom());
      const zoom = map.getZoom();
      zoom >= 10 && fetchDatas(map.getBounds(), zoom);
    });

    return null;
  };

  return (
    <MapContainer
      center={[43.58628850418765, 1.450417712407874]}
      zoom={9}
      style={{ height: "100dvh", width: "100dvw" }}
      ref={mapRef}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />{" "}
      <MarkerClusterGroup>
        {datas.length > 0 &&
          datas?.map((el) => (
            <Marker
              key={el.id}
              position={[el?.consolidated_latitude, el?.consolidated_longitude]}
              title={el.station_adress}
            >
              {" "}
              <Popup>{el.station_name}</Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
      <MapEventHandler />
      <h1 style={{ position: "absolute", zIndex: "1000" }}>{currentZoom}</h1>
    </MapContainer>
  );
}

export default Map;
