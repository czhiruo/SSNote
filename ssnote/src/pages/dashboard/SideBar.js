import React, { useState } from 'react';
import * as RxIcons from 'react-icons/rx';
import * as IoIcons from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './styles/SideBar.css';
import Logo from './assets/SSNote-Logo-gray.png';
import Menu from './assets/menu-bar copy.png';
// import { SidebarData } from './SidebarData';

function Sidebar() {

  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchButtonClick = () => {
    setShowSearchBar(true);
  };

  const handleSearchBarBlur = () => {
    setShowSearchBar(false);
  };

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
      
        {/* <Link to='/profile' id='profile'>
            <RxIcons.RxPerson className='icons' />
            Profile
        </Link> */}

        <Link to='/dashboard' id='dashboard'>
            <RxIcons.RxDashboard className='icons' />
            Dashboard
        </Link>

        {/* <Link to='/cheatsheets' id='cheatsheets'>
            <RxIcons.RxFileText className='icons' />
            Cheatsheets
        </Link> */}
        
        <Link to='/settings' id='settings'>
            <IoIcons.IoSettingsOutline className='icons' />
            Settings
        </Link>

        {/* <button id='search'>
          <IoIcons.IoSearchOutline className='icons' />
          Search
        </button> */}

        {showSearchBar ? (
          <input
            type='text'
            id='search-bar'
            placeholder='Search...'
            onBlur={handleSearchBarBlur}
          />
        ) : (
          <button id='search' onClick={handleSearchButtonClick}>
            <IoIcons.IoSearchOutline className='icons' />
            Search
          </button>
        )}

        
        

      <hr />

    </div>
    </div>
  )
}

export default Sidebar;

