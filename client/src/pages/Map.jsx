import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

const hostUrl = import.meta.env.VITE_API_URL;

function Map() {
  const datas = useLoaderData();
  const cachedValue = useMemo(() => datas, [datas]);

  function ZoomListener() {
    const map = useMapEvents({
      zoomend: () => {
        const zoomLvl = map.getZoom();
        const { lat } = map.getCenter();
        const { lng } = map.getCenter();
        fetch(`${hostUrl}/api/clusters/${zoomLvl}-${lat}-${lng}`)
          .then((r) => r.json)
          .then((d) => d);
      },
    });

    return null;
  }

  return (
    <MapContainer
      center={[43.58628850418765, 1.450417712407874]}
      zoom={13}
      style={{ height: "100dvh", width: "100dvw" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <ZoomListener />
      <MarkerClusterGroup>
        {cachedValue.map((el) => (
          <Marker
            key={el.id}
            position={[el.consolidated_latitude, el.consolidated_longitude]}
            title={el.station_adress}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
