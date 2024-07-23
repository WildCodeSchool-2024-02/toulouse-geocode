import { useRef, useState, useCallback, useEffect } from "react";
import { Map, Marker, GeolocateControl, Popup } from "react-map-gl/maplibre";
import useSupercluster from "use-supercluster";
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapPage.scss";
import { motion } from "framer-motion";
import PopupCard from "../components/PopupCard";
import useFetchData from "../utils/useFetchData";
import FilteringMenu from "../components/FilteringMenu";

function MapPage() {
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [isOpenedCluster, setIsOpenedCluster] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [stationDetails, setStationDetails] = useState(null);
  const [filterBy, setFilterBy] = useState("");
  const [points, setPoints] = useState([]);
  const [available, setAvailable] = useState("");
  const [initialZoom, setInitialZoom] = useState(0);

  const { fetchedData: filteredPlug } = useFetchData("chargingStation", {
    filterBy,
    [available]: "?",
  });

  const geoControlRef = useRef();

  useEffect(() => {
    if (window.innerWidth > 768) {
      setInitialZoom(5.2);
    } else {
      setInitialZoom(4.5);
    }
  }, []);

  useEffect(() => {
    setSelectedPoints([]);
  }, [available]);

  useEffect(() => {
    if (filteredPlug.length) {
      const newPoints = filteredPlug.map((item) => ({
        type: "Feature",
        properties: { cluster: false, itemId: item.id },
        geometry: {
          type: "Point",
          coordinates: [
            item.consolidated_longitude,
            item.consolidated_latitude,
          ],
        },
      }));
      setPoints(newPoints);
    }
  }, [filteredPlug]);

  const updateBounds = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      if (map) {
        const eachBounds = map.getBounds();
        const newBounds = [
          eachBounds.getWest(),
          eachBounds.getSouth(),
          eachBounds.getEast(),
          eachBounds.getNorth(),
        ];
        if (newBounds.every((coord) => !Number.isNaN(coord))) {
          setBounds(newBounds);
          setZoom(map.getZoom());
        }
      }
    }
  }, []);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: 150,
      maxZoom: 16,
    },
  });

  const selectAcluster = (clusterId) => {
    if (
      !supercluster.getChildren(clusterId).some((el) => el.properties.cluster)
    ) {
      setSelectedPoints(supercluster.getChildren(clusterId));
      setIsOpenedCluster(!isOpenedCluster);
    }
  };

  const calculateSpiralPosition = useCallback((index, totalPoints) => {
    const angle = (index / totalPoints) * 2 * Math.PI;
    const radius = 100;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  }, []);

  const clearSelectedPoints = () => {
    if (mapRef.current && mapRef.current.getZoom() < 14) {
      setSelectedPoints([]);
    }
  };

  const handlePopupTrigger = (point, offsetX = 0, offsetY = 0) => {
    setShowPopup({ ...point, offsetX, offsetY });
    fetch(
      `http://localhost:3310/api/charging-stations/${point?.properties?.itemId}`
    )
      .then((r) => r.json())
      .then((d) => setStationDetails(d));
  };

  return (
    <>
      <FilteringMenu
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setQuery={setAvailable}
      />
      {filteredPlug.length && (
        <Map
          initialViewState={{
            latitude: 46.94997900020931,
            longitude: 2.9643964911868776,
            zoom: initialZoom,
          }}
          maxZoom={16}
          ref={mapRef}
          mapStyle="https://api.jawg.io/styles/b8e0346f-8b93-4cac-b7b8-816c8fd852e8.json?access-token=8zKquTOfkoI1wfzpGaP9FMbbSiRrfUW1pGAuRyTDT7BFktAeT60GIRG5WSNFLvVt"
          style={{ width: "100dvw", height: "90dvh" }}
          onMoveEnd={updateBounds}
          onZoomEnd={clearSelectedPoints}
          onLoad={updateBounds}
        >
          <GeolocateControl
            ref={geoControlRef}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
            showUserHeading
            showAccuracyCircle
          />
          {clusters &&
            clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const { cluster: isCluster, point_count: pointCount } =
                cluster.properties;

              if (isCluster) {
                const size = (pointCount * 200) / points.length;
                return (
                  <Marker
                    latitude={latitude}
                    longitude={longitude}
                    key={`cluster-${cluster.id}`}
                    className="cluster-marker"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      zIndex: 2,
                    }}
                    role="button"
                    tabIndex={[0]}
                    onClick={() => {
                      selectAcluster(cluster.id);
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        16
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                    onKeyDown={() => console.info("why are you here ?!")}
                  >
                    <i className="fi fi-rr-charging-station" />
                    {` ${pointCount}`}
                  </Marker>
                );
              }
              return (
                <Marker
                  key={`alone-marker-${cluster.properties.itemId}`}
                  latitude={latitude}
                  longitude={longitude}
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    handlePopupTrigger(cluster);
                  }}
                  className="alone-marker"
                  style={{ zIndex: 1 }}
                >
                  <i
                    className={`fi fi-rr-charging-station alone-marker ${
                      showPopup &&
                      showPopup.properties.itemId === cluster.properties.itemId
                        ? "isActiveMarker"
                        : ""
                    }`}
                  />
                </Marker>
              );
            })}
          {selectedPoints.length &&
            selectedPoints.map((point, i) => {
              const [longitude, latitude] = point.geometry.coordinates;
              const { x, y } = calculateSpiralPosition(
                i,
                selectedPoints.length
              );
              return (
                <Marker
                  latitude={latitude}
                  longitude={longitude}
                  key={`point-modal-${point.properties.itemId}`}
                  className="point-modal-marker"
                >
                  <motion.i
                    className={`fi fi-rr-charging-station alone-marker ${
                      showPopup &&
                      showPopup.properties.itemId === point.properties.itemId
                        ? "isActiveMarker"
                        : ""
                    }`}
                    animate={{
                      x: isOpenedCluster ? x : 0,
                      y: isOpenedCluster ? y : 0,
                      opacity: isOpenedCluster ? 100 : 0,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePopupTrigger(point, x, y);
                    }}
                  />
                </Marker>
              );
            })}
          {showPopup && (
            <Popup
              latitude={showPopup.geometry.coordinates[1]}
              longitude={showPopup.geometry.coordinates[0]}
              style={{ zIndex: 3 }}
              offset={{
                top: [showPopup.offsetX, showPopup.offsetY],
                bottom: [showPopup.offsetX, showPopup.offsetY],
                left: [showPopup.offsetX, showPopup.offsetY],
                right: [showPopup.offsetX, showPopup.offsetY],
              }}
              onClose={() => {
                setShowPopup(null);
                setStationDetails(null);
              }}
            >
              <PopupCard
                stationDetails={stationDetails}
                available={available}
              />
            </Popup>
          )}
        </Map>
      )}
    </>
  );
}

export default MapPage;
