import React, { useState } from "react";
import Sidebar from "./SideBar";
import "./styles/Settings.css";
import LogoutPopup from "./LogoutPopup";
import DeleteAccountPopup from "./DeleteAccountPopup";
import {
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Settings = () => {
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [isDeleteAccountPopupOpen, setDeleteAccountPopupOpen] = useState(false);

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordFormVisible, setPasswordFormVisible] = useState(false);
  const [showPasswordSuccessMessage, setShowPasswordSuccessMessage] =
    useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [password, setPassword] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const user = auth.currentUser;

  //handle email change
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

    reauthenticateWithCredential(user, credentials)
      .then(() => {
        updateEmail(user, newEmail);
      })
      .then(() => {
        setEmailSuccess(true);
        setNewEmail("");
        setPassword("");
        setShowEmailInput(false);
      })
      .catch((error) => {
        setEmailError(error.message);
      });
  };

  //handle password change
  const handleChangePassword = () => {
    setPasswordError(null);
    setShowPasswordSuccessMessage(false);

    if (!oldPassword) {
      setPasswordError("Please enter your old password.");
      return;
    }

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError(
        "Passwords do not match. Please re-enter and confirm your new password."
      );
      return;
    }

    const credentials = EmailAuthProvider.credential(user.email, oldPassword);
    reauthenticateWithCredential(user, credentials)
      .then(() => {
        console.log("Password updated successfully");
        return updatePassword(user, newPassword);
      })
      .then(() => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setPasswordFormVisible(false);

        setShowPasswordSuccessMessage(true);
        setTimeout(() => {
          setShowPasswordSuccessMessage(false);
        }, 5000);
      })
      .catch((error) => {
        setPasswordError("Invalid old password. Please try again.");
      });

    // Call Firebase updatePassword method to change the user's password
    updatePassword(user, newPassword)
      .then(() => {
        setNewPassword("");
        setConfirmNewPassword("");
        setPasswordFormVisible(false); // Hide the form after successful password update
      })
      .catch((error) => {
        console.log("update password error");
        setPasswordError(error.message);
      });
  };

  //handle logout
  const handleLogoutPopupToggle = () => {
    setLogoutPopupOpen((prevIsLogoutPopupOpen) => !prevIsLogoutPopupOpen);
  };

  const handleLogoutConfirm = () => {
    signOut(auth)
      .then(() => {
        console.log("Successfully logged out");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error.message);
      });
    handleLogoutPopupToggle(); // Close the pop-up after log out actions
  };

  //handle delete account
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
                className="email-change"
                type="password"
                placeholder="Enter current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="email-change"
                type="text"
                placeholder="Enter new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <br />
              <button onClick={handleChangeEmail}>Update Email</button>
              <button onClick={() => setShowEmailInput(false)}>Cancel</button>
              <br />
              {emailSuccess && <p>Email updated successfully.</p>}
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
          )}
        </span>
        <hr className="sub-hr" />

        <span id="password">
          Password
          <button
            id="password-button"
            onClick={() => setPasswordFormVisible(true)}
          >
            Change Password
          </button>
          <br />
          {showPasswordSuccessMessage && (
            <p className="success-message">Password updated successfully.</p>
          )}
          {passwordError && <p className="error-message">{passwordError}</p>}
          {isPasswordFormVisible && (
            <div>
              <input
                className="change-password"
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <br />

              <input
                className="change-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <input
                className="change-password"
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />

              <br />

              <button onClick={handleChangePassword}>Update Password</button>
              <button onClick={() => setPasswordFormVisible(false)}>
                Cancel
              </button>
            </div>
          )}
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
