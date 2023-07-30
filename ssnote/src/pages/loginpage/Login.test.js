import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

// Mock the signInWithEmailAndPassword function from firebase/auth
// This is optional, but you can use it for testing error scenarios without making real API calls
jest.mock("../../firebase", () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
}));

describe("Login component", () => {
  it("renders login form correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if the email and password inputs are rendered
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("updates input values correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Type into the email and password inputs
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Verify that the input values are updated
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("calls handleSubmit when form is submitted", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Mock the form submission
    const handleSubmit = jest.fn();
    const form = screen.getByRole("form");
    form.addEventListener("submit", handleSubmit);

    // Submit the form
    fireEvent.submit(form);

    // Verify that the handleSubmit function is called
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("displays 'Forgot Password?' link", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const forgotPasswordLink = screen.getByText("Forgot Password?");
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  it("displays 'Sign Up Here!' link", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const signUpLink = screen.getByText("Sign Up Here!");
    expect(signUpLink).toBeInTheDocument();
  });

  it("navigates to dashboard on successful login", () => {
    // Mock the signInWithEmailAndPassword function to resolve with a user
    const mockUserCredential = { user: { uid: "mockUserId" } };
    const signInWithEmailAndPasswordMock = jest.fn().mockResolvedValueOnce(
      mockUserCredential
    );
    // Replace the mocked function with the actual implementation
    // from the firebase/auth module
    jest.spyOn(Login.auth, "signInWithEmailAndPassword").mockImplementation(
      signInWithEmailAndPasswordMock
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Type into the email and password inputs
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit the form
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    // Check if the navigation to the dashboard route occurs
    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );
    expect(window.location.pathname).toBe("/dashboard");
  });

  it("displays error message for invalid login", async () => {
    // Mock the signInWithEmailAndPassword function to throw an error
    const signInWithEmailAndPasswordMock = jest
      .fn()
      .mockRejectedValueOnce({
        code: "auth/invalid-email",
        message: "The email address is badly formatted.",
      });
    // Replace the mocked function with the actual implementation
    // from the firebase/auth module
    jest.spyOn(Login.auth, "signInWithEmailAndPassword").mockImplementation(
      signInWithEmailAndPasswordMock
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Type into the email and password inputs
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit the form
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    // Wait for the error message to be displayed
    const errorMessage = await screen.findByText("Invalid user");
    expect(errorMessage).toBeInTheDocument();
  });
});
