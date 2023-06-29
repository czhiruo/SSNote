import { useState } from "react";
import "./styles.css";
import logo from './SSNotelogo.jpeg'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  //store information for users to login
  const database = [
    {
      username: "zhiruo",
      password: "1234"
    },
    {
      username: "krista",
      password: "pass2"
    }
  ];

  const errors = {
    email: "email not found",
    password: "wrong password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    console.log(document.forms[0]);

    var { email, password } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.email === email.value);

    // Compare user info
    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        setIsSubmitted(true);
        navigate.push('/dashboard');
      }
    } else {
      // Username not found
      setErrorMessages({ name: "email", message: errors.email });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  function handlePasswordChange() {
    alert("Change Password!")
  }

  function handleNewAccount() {

  }

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
          <div className="changePassword" onClick = {handlePasswordChange}>
          <u>Forgot Password?</u>
          </div>
          <div className="signUp" onClick = {handleNewAccount}>
            <u>Sign Up Here!</u>
          </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <img className="logo" src={logo} alt = "logo"/>
        <div className="title">Login</div>
        {isSubmitted ? (<div>User is successfully logged in</div>) : renderForm}
      </div>
    </div>
  );
}

export default Login;