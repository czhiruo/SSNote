import { useState } from "react";
import "./styles.css";
import logo from "./SSNotelogo.jpeg";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  //handles logic when users press log in button
  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/dashboard")
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid user");
      });
  };

  function handlePasswordChange() {
    alert("Change Password!");
  }

  //link to sign up
  function handleNewAccount() {
    navigate("/signup")
  }

  //login form display
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
        {renderForm}
      </div>
    </div>
  );
};

export default Login;
