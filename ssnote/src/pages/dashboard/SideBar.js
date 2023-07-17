import React from 'react';
import * as RxIcons from 'react-icons/rx';
import * as IoIcons from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './styles/SideBar.css';
import Logo from './assets/SSNote-Logo-gray.png';
import Menu from './assets/menu-bar copy.png';
// import { SidebarData } from './SidebarData';

function Sidebar() {
  return (
    <div>
      
    <div className='sidebar'>
      <div className='leftSide'>
        {/* sidebar button and logo */}
        {/* <button>
            <img id='menu-logo' src={Menu} alt="menu-logo"/>
        </button> */}
        
        <img id='ssnote-logo' src={Logo} alt="ssnote-logo" />
      </div>
      
        <Link to='/profile' id='profile'>
            <RxIcons.RxPerson className='icons' />
            Profile
        </Link>

        <Link to='/dashboard' id='dashboard'>
            <RxIcons.RxDashboard className='icons' />
            Dashboard
        </Link>

        <Link to='/cheatsheets' id='cheatsheets'>
            <RxIcons.RxFileText className='icons' />
            Cheatsheets
        </Link>
        
        <Link to='/settings' id='settings'>
            <IoIcons.IoSettingsOutline className='icons' />
            Settings
        </Link>
        
        <Link to='/search' id='search'>
            <IoIcons.IoSearchOutline className='icons' />
            Search
        </Link>

      <div id='divider'>
        ______________
      </div>

    </div>
    </div>
  )
}

export default Sidebar;
