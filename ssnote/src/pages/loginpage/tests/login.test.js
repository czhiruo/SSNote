import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";

describe("Login Component", () => {
  test("renders login form", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    
    // Check if the login form elements are rendered
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign Up Here!")).toBeInTheDocument();
  });

  test("form submission", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);

    // Mock user input for email and password
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });

    // Submit the form
    fireEvent.click(screen.getByText("Log In"));

    // You can test further here based on what happens after the form submission
    // For example, you can check if the user is redirected to the dashboard
    // or if an error message is displayed for invalid credentials.
  });
});
