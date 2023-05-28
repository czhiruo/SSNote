import React from 'react';
import Logo from '../assets/SSNote-logo-white.png';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import '../styles/Sidebar.css';

function Navbar() {
  return (
    <div>
        <div className='navbar'>
            <div className='leftside'>
                <img src={Logo}/>
            </div>

            <div className='rightside'>
                <Link to='/' id='dashboard-link'>Dashboard</Link>
                <Link to='/cheatsheets' id='cheatsheets-link'>Cheatsheets</Link>


            </div>
            
        </div>
      
    </div>
  )
}

export default Navbar
