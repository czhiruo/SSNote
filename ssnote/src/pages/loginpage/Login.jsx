import { useState } from "react";
import "./styles.css";
import logo from './SSNotelogo.jpeg'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  // Store information for users to login
  const database = [
    {
      email: "e0967827@u.nus.edu",
      password: "1234"
    },
    {
      email: "e2746237@u.nus.edu",
      password: "pass2"
    }
  ];

  const errors = {
    email: "email not found",
    password: "wrong password"
  };

  const handleSubmit = (event) => {
  event.preventDefault();
  const userData = database.find((user) => user.email === email);

  if (userData) {
    if (userData.password !== password) {
      setErrorMessages({ name: "password", message: errors.password });
    } else {
      setTimeout(() => {
        setIsSubmitted(true);
        navigate('/dashboard');
      }, 0);
    }
  } else {
    setErrorMessages({ email: "email", message: errors.email });
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
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {renderErrorMessage("pass")}
        </div>
        <div className="changePassword" onClick={handlePasswordChange}>
          <u>Forgot Password?</u>
        </div>
        <div className="signUp" onClick={handleNewAccount}>
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
        <img className="logo" src={logo} alt="logo" />
        <div className="title">Login</div>
        {isSubmitted ? navigate('/dashboard') : renderForm}
      </div>
    </div>
  );
}

export default Login;
