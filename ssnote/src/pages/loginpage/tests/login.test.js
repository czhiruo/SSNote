import React from "react";
import { render } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";

test("renders Login component correctly", () => {
  const { asFragment } = render(<BrowserRouter><Login /></BrowserRouter>);
  expect(asFragment()).toMatchSnapshot();
});
