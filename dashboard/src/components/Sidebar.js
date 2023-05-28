import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
        <Link to='/profile&settings' id='profilesettings-link'>Profile & Settings</Link>
        <br></br>
        <Link to='/search' id='search-link'>Search</Link>
        <br></br>
        <br></br>
        <span id='files-heading'>Files</span>
      
    </div>
  )
}

export default Sidebar
