import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSent(true);
      })
      .catch((error) => {
        setError(error.message); // Set the error message
      });
  };

  return (
    <div className="forgot-password-container">
      {!resetSent ? (
        <>
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleResetPassword}>Send Reset Link</button>
          {error && <p className="error">{error}</p>}
        </>
      ) : (
        <>
          <h2>Reset link sent!</h2>
          <p>
            An email with a password reset link has been sent to {email}. Please
            check your inbox and follow the instructions to reset your password.
          </p>
          <Link to="/">Go back to Login</Link>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
