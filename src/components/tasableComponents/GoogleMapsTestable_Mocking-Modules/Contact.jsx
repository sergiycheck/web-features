import React from "react";
import MyAppMap from "./map";

export default function Contact({ name, email, site, center, zoom }) {
  return (
    <div>
      <address>
        Contact {name} via{" "}
        <a data-testid="email" href={`mailto:` + email}>
          email
        </a>{" "}
        or on their{" "}
        <a data-testid="site" href={site}>
          website
        </a>
      </address>
      <MyAppMap center={center} zoom={zoom}></MyAppMap>
    </div>
  );
}
