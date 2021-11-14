import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";

import CheckboxWithLabel from "../CheckboxWithLables";

//running cleanup ofterEach is done automatically for you in @testing-library/react@9.0.0 or higher
//afterEach(cleanup);

it("CheckboxWithLabel changes the test after click", () => {
  const { queryByLabelText, getByLabelText } = render(
    <CheckboxWithLabel labelOn="On" labelOff="Off"></CheckboxWithLabel>
  );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
