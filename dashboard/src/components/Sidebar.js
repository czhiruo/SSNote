import React from 'react';
import * as RxIcons from 'react-icons/rx';
import * as IoIcons from 'react-icons/io5';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
// import { SidebarData } from './SidebarData';

function Sidebar() {
  return (
    <div className='sidebar'>
        
        <Link to='/profile' id='profile'>
            <RxIcons.RxPerson className='icons' />
            Profile
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
        _________________
      </div>

    </div>
  )
}

export default Sidebar;
