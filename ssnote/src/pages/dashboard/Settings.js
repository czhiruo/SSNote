import React, { useState } from "react";
import Sidebar from "./SideBar";
import "./styles/Settings.css";
import LogoutPopup from "./LogoutPopup";
import DeleteAccountPopup from "./DeleteAccountPopup";
import {
  getAuth,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

// import LoginPage from './pages/loginpage/LoginPage';

const Settings = () => {
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const handleChangeEmail = () => {
    
    setEmailError(null);
    setEmailSuccess(false);

    if (!newEmail) {
      setEmailError("Please enter a new email.");
      return;
    }
    if (!password) {
      setEmailError("Please enter your password to confirm.");
      return;
    }

    const credentials = EmailAuthProvider.credential(user.email, password);
    console.log(credentials);

    // Call Firebase updateEmail method to change the user's email
    reauthenticateWithCredential(user, credentials)
      .then(() => {
        // User successfully reauthenticated, now update their email
        updateEmail(user, newEmail);
      })
      .then(() => {
        setEmailSuccess(true);
        setNewEmail("");
        setPassword("");
        setShowEmailInput(false); // Close the pop-up after successful update
      })
      .catch((error) => {
        setEmailError(error.message);
      });
  };

  const handleChangePassword = () => {
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    // Call Firebase updatePassword method to change the user's password
    updatePassword(user, newPassword)
      .then(() => {
        setPasswordSuccess(true);
        setNewPassword("");
      })
      .catch((error) => {
        setPasswordError(error.message);
      });
  };

  const handleLogoutPopupToggle = () => {
    setLogoutPopupOpen((prevIsLogoutPopupOpen) => !prevIsLogoutPopupOpen);
  };

  const handleLogoutConfirm = () => {
    // Perform logout actions here
    console.log("Performing log out actions...");
    handleLogoutPopupToggle(); // Close the pop-up after log out actions
  };

  const [isDeleteAccountPopupOpen, setDeleteAccountPopupOpen] = useState(false);

  const handleDeleteAccountPopupToggle = () => {
    setDeleteAccountPopupOpen(
      (prevIsDeleteAccountPopupOpen) => !prevIsDeleteAccountPopupOpen
    );
  };

  const handleDeleteAccountConfirm = () => {
    // Perform delete account actions here
    console.log("Performing delete account actions...");
    handleDeleteAccountPopupToggle(); // Close the pop-up after delete account actions
  };

  return (
    <div>
      <Sidebar />
      <div className="settings">
        <p id="settings-title">Settings</p>
        <hr />

        <span id="email">
          <span id="email-text">
            Email
            {/* <br /> */}
            <span id="curr-email">
              {user ? (
                <span>{user.email}</span>
              ) : (
                <span>Please log in to view settings.</span>
              )}
            </span>
          </span>

          {/* Button to toggle the email input pop-up */}
          {user && (
            <span>
              <button id="email-button" onClick={() => setShowEmailInput(true)}>
                Change Email
              </button>
            </span>
          )}

          {/* Pop-up with the email input */}
          {showEmailInput && (
            <div>
              <input
                type="password"
                placeholder="Enter current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button onClick={handleChangeEmail}>Update Email</button>
              <button onClick={() => setShowEmailInput(false)}>Cancel</button>
              <br />
              {emailSuccess && <p>Email updated successfully.</p>}
              {emailError && <p>Error: {emailError}</p>}
            </div>
          )}
        </span>
        <hr className="sub-hr" />

        <span id="password">
          Password
          <button id="password-button" onClick={handleChangePassword}>
            Change Password
          </button>
          <br />
          {passwordSuccess && <p>Password updated successfully.</p>}
          {passwordError && <p>Error: {passwordError}</p>}
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </span>
        <hr className="sub-hr" />

        <button id="logout" onClick={handleLogoutPopupToggle}>
          Log Out
        </button>

        {isLogoutPopupOpen && (
          <LogoutPopup
            onCancel={handleLogoutPopupToggle}
            onConfirm={handleLogoutConfirm}
          />
        )}

        <button id="delete-account" onClick={handleDeleteAccountPopupToggle}>
          Delete Account
        </button>
        {isDeleteAccountPopupOpen && (
          <DeleteAccountPopup
            onCancel={handleDeleteAccountPopupToggle}
            onDelete={handleDeleteAccountConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;

