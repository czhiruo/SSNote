import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("renders email and password inputs correctly", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("calls handleSubmit when form is submitted", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const handleSubmit = jest.fn();
  const form = screen.getByTestId("login-form");
  form.addEventListener("submit", handleSubmit);

  fireEvent.submit(form);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
