import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    name: "Jack Orl",
    followers: "12",
    location: "123, Charming Avenue",
  };

  jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    });
  });

  //Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<User name="jimmy" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(
    fakeUser.followers
  );
  expect(container.textContent).toContain(fakeUser.location);

  //remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
