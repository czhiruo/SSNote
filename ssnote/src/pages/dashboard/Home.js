import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import file1 from './assets/math-curriculum copy.webp';
import file2 from './assets/science.banner2 copy.png';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import PopupMenu from './PopupMenu'; // Import the PopupMenu component

function Home() {
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);

  const toggleMenu1 = (event) => {
    event.preventDefault(); // Prevent default link behavior
    event.stopPropagation(); // Prevent link click when clicking the button
    setShowMenu1(!showMenu1);
  };

  const toggleMenu2 = (event) => {
    event.preventDefault(); // Prevent default link behavior
    event.stopPropagation(); // Prevent link click when clicking the button
    setShowMenu2(!showMenu2);
  };

  return (
    <div className='home'>
      <p id='dashboard-title'>Dashboard</p>
      <hr />

      <div className='files'>
        <div className='file'>
          <Link to='/file1'>
            <img src={file1} alt='file1' />
            <br />

            <button onClick={toggleMenu1}>
              <IoEllipsisVerticalSharp />
            </button>

            <br />
            <span className='file-title'>File1</span>
          </Link>
          {showMenu1 && <PopupMenu onClose={() => setShowMenu1(false)} />} {/* Render the pop-up menu conditionally */}
        </div>

        <br />

        <div className='file'>
          <Link to='/file2'>
            <img src={file2} alt='file2' />
            <br />

            <button onClick={toggleMenu2}>
              <IoEllipsisVerticalSharp />
            </button>

            <br />
            <span className='file-title'>File2</span>
          </Link>
          {showMenu2 && <PopupMenu onClose={() => setShowMenu2(false)} />} {/* Render the pop-up menu conditionally */}
        </div>
      </div>
    </div>
  );
}

export default Home;
