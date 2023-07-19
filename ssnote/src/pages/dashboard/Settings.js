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

            <span id='email'>
                <span id='email-text'>
                    Email
                    <br />
                    current email
                </span>
                
                <button id='email-button'>
                    Change Email
                </button>
            </span>

            <hr className='sub-hr'/>

            <span id='password'>
                Password
                <button id='password-button'>
                Change Password
                </button>
            </span>
            
            <hr className='sub-hr'/>

            <button id='logout'>
                Log Out
            </button>

            <button id='delete-account'>
                Delete Account
            </button>

        </div>
      
    </div>
  )
}

export default Settings
