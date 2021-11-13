import React, {
  // useState,
  useEffect,
  useRef,
} from "react";

// https://github.com/googlemaps/react-wrapper/blob/main/examples/basic.tsx

import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export const Spinner = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

const render = (status) => {
  let renderedResult;

  switch (status) {
    case status === Status.LOADING:
      renderedResult = <Spinner />;
      break;
    case status === Status.FAILURE:
      renderedResult = <div>failure</div>;
      break;
    default:
      renderedResult = <div>rendering...</div>;
      break;
  }

  return renderedResult;
};

export const Map = ({ center, zoom, style }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });
  });

  return <div ref={mapRef} id="map" style={style}></div>;
};

export const MyAppMap = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const center = { lat: 50.7357116, lng: 24.1378457 };
  const zoom = 10;

  return (
    <div className="row">
      <div className="col">
        <h3>map should be here</h3>
        <Wrapper apiKey={apiKey} render={render}>
          <Map
            center={center}
            zoom={zoom}
            style={{
              height: "400px",
              width: "700px",
            }}
          ></Map>
        </Wrapper>
      </div>
    </div>
  );
};
