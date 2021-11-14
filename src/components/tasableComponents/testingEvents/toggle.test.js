import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Toggle from "./Toggle";

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

it("changes value when clicked", () => {
  const onChange = jest.fn();

  act(() => {
    render(<Toggle onChange={onChange}></Toggle>, container);
  });

  const button = container.querySelector("[data-testid='toggle']");
  expect(button.innerHTML).toBe("turn on");

  const clickOnButton = () =>
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  act(() => {
    clickOnButton();
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("turn off");

  act(() => {
    for (let i = 0; i < 5; i++) {
      clickOnButton();
    }
  });

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe("turn on");
});
