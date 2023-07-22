import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

const DeleteAccountPopup = ({ onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const user = auth.currentUser;

  const handleDeleteAccountConfirm = async () => {
    setError(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    const credentials = EmailAuthProvider.credential(email, password);

    // Perform reauthentication with the provided credentials
    reauthenticateWithCredential(user, credentials)
      .then(() => {
        // Reauthentication successful, proceed with account deletion
        deleteUser(user)
          .then(() => {
            console.log("Account Deleted");
            deleteDoc(doc(db, "users", user.uid))
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
        console.log(error.message);
      });
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span onClick={onCancel} className="close-button">
          &times;
        </span>
        <h2>Confirm Account Deletion</h2>
        <p>Are you sure you want to delete your account?</p>
        <p>
          This action is <b>irreversible</b>.
        </p>

        <form>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email-confirm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password-confirm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </form>

        {error && <p className="error-message">{error}</p>}

        <br />

        <div className="popup-actions">
          <button onClick={onCancel}>Cancel</button>
          <Link to="/account-deleted">
            <button onClick={handleDeleteAccountConfirm} id="confirm-delete">
              Delete Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;
