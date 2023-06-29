import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Cheatsheets.css';
import cover from './assets/What-is-A4-size copy.jpg';
import Sidebar from './SideBar';

function Cheatsheets() {
  return (
    <div>
    <Sidebar />
    <div className='cheatsheets'>
      <p id='cheatsheets-title'>Cheatsheets</p>
      <hr />
      <div className='cheatsheet-files'>
        <Link className='cheatsheet' to='/file1'>
            <span className='cheatsheet-title'>File1</span>
            <br />
            <img src={cover} alt="cover"/>
        </Link>

        <br />

        <Link className='cheatsheet' to='/file2'>
            <span className='cheatsheet-title'>File2</span>
            <br />
            <img src={cover} alt="cover"/>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Cheatsheets;
