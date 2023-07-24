import React from "react";
import { render } from "@testing-library/react";
import Login from "../Login";

test("renders Login component correctly", () => {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});
