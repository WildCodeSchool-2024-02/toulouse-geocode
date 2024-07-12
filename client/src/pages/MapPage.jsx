import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { Map, Marker, GeolocateControl } from "react-map-gl/maplibre";
import useSupercluster from "use-supercluster";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLoaderData } from "react-router-dom";
import "./MapPage.scss";
import { motion } from "framer-motion";

function MapPage() {
  const items = useLoaderData();
  const viewport = {
    latitude: 46.94997900020931,
    longitude: 2.9643964911868776,
    zoom: 5.213923089764548,
  };
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [isOpenedCluster, setIsOpenedCluster] = useState(false);
  const geoControlRef = useRef();
  useEffect(() => {
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

  const points = useMemo(
    () =>
      items.map((item) => ({
        type: "Feature",
        properties: { cluster: false, itemId: item.id },
        geometry: {
          type: "Point",
          coordinates: [
            item.consolidated_longitude,
            item.consolidated_latitude,
          ],
        },
      })),
    [items]
  );

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
  return (
    <Map
      initialViewState={{ ...viewport }}
      on
      maxZoom={16}
      ref={mapRef}
      mapStyle="https://api.jawg.io/styles/b8e0346f-8b93-4cac-b7b8-816c8fd852e8.json?access-token=8zKquTOfkoI1wfzpGaP9FMbbSiRrfUW1pGAuRyTDT7BFktAeT60GIRG5WSNFLvVt"
      style={{ width: "100vw", height: "calc(100dvh - 80px)" }}
      onMoveEnd={updateBounds}
      onZoomEnd={clearSelectedPoints}
      onLoad={updateBounds}
    >
      <GeolocateControl
        ref={geoControlRef}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
        showUserHeading
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
                onClick={() => selectAcluster(cluster.id)}
              >
                <div
                  className="cluster-marker"
                  style={{ width: `${size}px`, height: `${size}px` }}
                  role="button"
                  tabIndex={[0]}
                  onClick={() => {
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
                </div>
              </Marker>
            );
          }
          return (
            <Marker
              key={`cluster-${cluster.properties.itemId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <div className="alone-marker">
                <i className="fi fi-rr-charging-station" />
              </div>
            </Marker>
          );
        })}
      {selectedPoints.length &&
        selectedPoints.map((point, i) => {
          const [longitude, latitude] = point.geometry.coordinates;
          const { x, y } = calculateSpiralPosition(i, selectedPoints.length);
          return (
            <Marker
              latitude={latitude}
              longitude={longitude}
              key={`point-modal-${point.properties.itemId}`}
              onClick={() => setIsOpenedCluster(!isOpenedCluster)}
              className="deep-cluster-marker"
            >
              <motion.div
                animate={{
                  x: isOpenedCluster ? x : 0,
                  y: isOpenedCluster ? y : 0,
                  opacity: isOpenedCluster ? 100 : 0,
                }}
                className="alone-marker"
              >
                <i className="fi fi-rr-charging-station" />
              </motion.div>
            </Marker>
          );
        })}
    </Map>
  );
}

export default MapPage;
