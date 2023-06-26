import React from 'react';
import Logo from '../assets/SSNote-Logo-gray.png';
import Menu from '../assets/menu-bar copy.png';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {

  return (

    <div className='navbar'>

      <div className='leftSide'>
        {/* sidebar button and logo */}
        <button>
            <img id='menu-logo' src={Menu} alt="menu-logo"/>
        </button>
        
        <img id='ssnote-logo' src={Logo} alt="ssnote-logo" />
      </div>

      <div className='rightSide'>
        <Link to='/' id='dashboard-link'>Dashboard</Link>
        <Link to='/cheatsheets' id='cheatsheets-link'>Cheatsheets</Link>
      </div>

    </div>
  )
}

export default Navbar;
