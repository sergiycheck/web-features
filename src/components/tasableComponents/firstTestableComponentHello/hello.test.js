import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Hello from "./hello";

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

it("renders with or without a name", () => {
  act(() => {
    render(<Hello />, container);
  });

  expect(container.textContent).toBe("Hello, noname");

  act(() => {
    render(<Hello name="Robert" />, container);
  });

  expect(container.textContent).toBe("Hello, Robert");

  act(() => {
    render(<Hello name="Martin" />, container);
  });

  expect(container.textContent).toBe("Hello, Martin");
});
