import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import file1 from './assets/math-curriculum copy.webp';
import file2 from './assets/science.banner2 copy.png';
import { FaPlus } from 'react-icons/fa'; // Import the FaPlus icon for the plus button

function Home() {

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup

  return (
    <div className='home'>
      <p id='dashboard-title'>Dashboard</p>
      <hr />

      <div className='files'>
        <div className='file'>
          <Link to='/file1'>
            <img src={file1} alt='file1' />
            <br />

            <span className='file-title'>File1</span>
          </Link>
        </div>

        <br />

        <div className='file'>
          <Link to='/file2'>
            <img src={file2} alt='file2' />
            <br />
            <span className='file-title'>File2</span>
          </Link>
        </div>
      </div>

      {/* Plus button */}
      <button id='plus-button' onClick={togglePopup}>
        <FaPlus />
      </button>

      {/* Popup container */}
      {showPopup && (
        <div className='popup-container'>
          {/* Add your content/form for creating a new file here */}
          <button id='create-folder'><h3>Create New Note</h3></button>
          <br />
          {/* Add your form or content here */}
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Home;