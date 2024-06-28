import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import DeckGL from "@deck.gl/react";
import { IconLayer } from "@deck.gl/layers";
import { Map, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

const hostUrl = import.meta.env.VITE_API_URL;

function MapComponent() {
  const globalClusters = useLoaderData();
  const deckRef = useRef();

  const layers = [
    new IconLayer({
      id: "icon-layer",
      data: globalClusters,
      getIcon: (d) => "marker",
      getPosition: (d) => [d.consolidated_longitude, d.consolidated_latitude],
      getSize: 40,
      iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
      iconMapping: {
        marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
      },
      sizeScale: 1,
      pickable: true,
    }),
  ];

  const getTooltip = useCallback(({ object }) => {
    return object && object.station_name;
  }, []);

  return (
    <DeckGL
      ref={deckRef}
      layers={layers}
      initialViewState={{
        longitude: 1.450417712407874,
        latitude: 43.58628850418765,
        zoom: 14,
      }}
      controller={true}
      getTooltip={getTooltip}
    >
      <Map
        initialViewState={{
          latitude: 43.58628850418765,
          longitude: 1.450417712407874,
          zoom: 14,
        }}
        style={{ width: "100dvw", height: "100dvh" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <Marker longitude={1.450417712407874} latitude={43.58628850418765} color="red" />
      </Map>
    </DeckGL>
  );
}

export default MapComponent;
