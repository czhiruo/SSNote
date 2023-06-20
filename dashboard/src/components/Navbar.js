import React from 'react';
import Logo from '../assets/SSNote-Logo-gray copy.png';
import Menu from '../assets/menu-bar copy.png';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {

  return (

    <div className='navbar'>

      <div className='leftSide'>
        {/* sidebar button and logo */}
        <button>
            <img id='menu-logo' src={Menu} />
        </button>
        
        <img id='ssnote-logo' src={Logo} />
      </div>

      <div className='rightSide'>
        <Link to='/' id='dashboard-link'>Dashboard</Link>
        <Link to='/cheatsheets' id='cheatsheets-link'>Cheatsheets</Link>
      </div>

    </div>
  )
}

export default Navbar;
