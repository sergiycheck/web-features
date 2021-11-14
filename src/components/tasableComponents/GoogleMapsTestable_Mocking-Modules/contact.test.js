import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Contact from "./Contact.jsx";
import MockedMap from "./map";

jest.mock("./map", () => {
  return function DummyMap({ center }) {
    return (
      <div data-testid="map">
        latitude: {center.lat}, longitude: {center.lng}
      </div>
    );
  };
});

let container = null;

beforeEach(() => {
  //setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render contact information", () => {
  const center = { lat: 12, lng: 21 };
  const name = "Mickle Jams";
  const email = "login@domain.com";
  const site = "https://example.com";

  act(() => {
    render(
      <Contact name={name} email={email} site={site} center={center}></Contact>,
      container
    );
  });

  expect(
    container.querySelector("[data-testid='email']").getAttribute("href")
  ).toEqual(`mailto:` + email);

  expect(
    container.querySelector("[data-testid='site']").getAttribute("href")
  ).toEqual(site);

  expect(container.querySelector("[data-testid='map']").textContent).toEqual(
    `latitude: ${center.lat}, longitude: ${center.lng}`
  );
});
