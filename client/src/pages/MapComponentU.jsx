import React, { useMemo, useRef } from "react";
import { Map, Source, Layer, useMap } from "react-map-gl/maplibre";
import { useSupercluster } from "react-map-gl-supercluster/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const items = [
  { id: 1, latitude: 37.78, longitude: -122.41 },
  { id: 2, latitude: 37.79, longitude: -122.42 },
  // Ajouter plus d'éléments si nécessaire
];

const createPoints = (items) => {
  return items.map((item) => ({
    type: "Feature",
    properties: { cluster: false, item },
    geometry: {
      type: "Point",
      coordinates: [item.longitude, item.latitude],
    },
  }));
};

const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": ["step", ["get", "point_count"], "#51bbd6", 100, "#f1f075", 750, "#f28cb1"],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

const MapComponentU = () => {
  const mapRef = useRef();
  const { current: map } = useMap();

  const points = useMemo(() => createPoints(items), [items]);

  const mapFeature = useMemo(() => (props) => ({ items: [props.item] }), []);

  const reduceCluster = useMemo(
    () => (memo, props) => {
      memo.items = memo.items.concat(props.items);
    },
    [],
  );

  const { clusters, supercluster } = useSupercluster({
    points,
    map: mapFeature,
    reduce: reduceCluster,
    options: { radius: 75, maxZoom: 20 },
  });

  const handleClick = (event) => {
    const feature = event.features[0];
    if (!feature.properties.cluster) return;

    const clusterId = feature.properties.cluster_id;
    const expansionZoom = supercluster.getClusterExpansionZoom(clusterId);

    mapRef.current.easeTo({
      center: feature.geometry.coordinates,
      zoom: expansionZoom,
      duration: 500,
    });
  };

  return (
    <Map
      initialViewState={{
        latitude: 40.67,
        longitude: -103.59,
        zoom: 3,
      }}
      mapStyle="https://demotiles.maplibre.org/style.json"
      interactiveLayerIds={[clusterLayer.id]}
      onClick={handleClick}
      ref={mapRef}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Source
        id="earthquakes"
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: clusters,
        }}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  );
};

export default MapComponentU;
