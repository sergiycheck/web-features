import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Card from "./Card.jsx";

let container = null;

beforeEach(() => {
  //setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});

it("should select null ofter timing out", () => {
  const onSelect = jest.fn();
  const time = 5000;

  act(() => {
    render(<Card onSelect={onSelect} time={time} />, container);
  });

  //move ahead in time by 100ms
  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  //and then move ahead by 5 seconds
  act(() => {
    jest.advanceTimersByTime(time);
  });
  expect(onSelect).toHaveBeenCalledWith(null);
});

it("should cleanup on being removed", () => {
  const onSelect = jest.fn();
  const time = 5000;

  act(() => {
    render(<Card onSelect={onSelect} time={time} />, container);
  });
  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  // unmount the app
  act(() => {
    render(null, container);
  });

  act(() => {
    jest.advanceTimersByTime(time);
  });
  expect(onSelect).not.toHaveBeenCalled();
});
it("should accept selections", () => {
  const onSelect = jest.fn();
  const time = 5000;
  act(() => {
    render(<Card onSelect={onSelect} time={time} />, container);
  });

  act(() => {
    container
      .querySelector(`[data-testid="2"]`)
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onSelect).toHaveBeenCalledWith(2);
});
