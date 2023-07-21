import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { db, auth } from "../../firebase";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account successfully created with", userCredential)
        const userRef = doc(db, 'users', userCredential.user.uid);
        setDoc(userRef, { email: email });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/"); // Redirect to login page after closing the modal
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>

      {/* Modal for success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to SSNote!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully signed up! Click the button below to proceed to the login page.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
