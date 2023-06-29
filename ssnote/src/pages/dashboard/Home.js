import React from 'react';
import { Link } from 'react-router-dom'
import './styles/Home.css';
import file1 from './assets/math-curriculum copy.webp';
import file2 from './assets/science.banner2 copy.png';
import { IoEllipsisVerticalSharp } from "react-icons/io5";


function Home() {
  return (
    <div className='home'>
      <p id='dashboard-title'>Dashboard</p>
      <hr />
      
      <div className='files'>
        <Link className='file' to='/file1'>
            <img src={file1} alt = "file1"/>
            <br />

            <button>
                <IoEllipsisVerticalSharp />
            </button>

            <br />
            <span className='file-title'>File1</span>
        </Link>

        <br />

        <Link className='file' to='/file2'>
            <img src={file2} alt = "file2"/>
            <br />
            
            <button>
                <IoEllipsisVerticalSharp />
            </button>

            <br />
            <span className='file-title'>File2</span> 
        </Link>
      </div>
    </div>
  );
}

export default Home;