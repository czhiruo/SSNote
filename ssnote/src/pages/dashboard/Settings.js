import React from 'react';
import Sidebar from './SideBar';
import './styles/Settings.css';

function Settings() {
  return (
    <div>
        <Sidebar />
        <div className='settings'>
            <p id='settings-title'>Settings</p>
            <hr />

        </div>
      
    </div>
  )
}

export default Settings
