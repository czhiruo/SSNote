import React from 'react';
import Sidebar from './SideBar';
import './styles/Profile.css';

function Profile() {
  return (
    <div>
        <Sidebar />
        <div className='profile'>
            <p id='profile-title'>Profile</p>
            <hr />

        </div>
      
    </div>
  )
}

export default Profile
