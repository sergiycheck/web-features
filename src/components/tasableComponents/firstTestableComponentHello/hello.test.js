import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

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

//runs and sets passed, but on the extension tab an error occures
it("renders with or without a name", () => {
  act(() => {
    render(<Hello />, container);
  });

  /*... not gets filled automatically by jest */
  // expect(pretty(container.innerHTML)).toMatchInlineSnapshot();

  expect(container.textContent).toBe("Hello, noname");

  act(() => {
    render(<Hello name="Robert" />, container);
  });

  /*... not gets filled automatically by jest */
  // expect(pretty(container.innerHTML)).toMatchInlineSnapshot();

  expect(container.textContent).toBe("Hello, Robert");

  act(() => {
    render(<Hello name="Martin" />, container);
  });

  /*... not gets filled automatically by jest */
  // expect(pretty(container.innerHTML)).toMatchInlineSnapshot();

  expect(container.textContent).toBe("Hello, Martin");
});
