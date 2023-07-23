import * as RxIcons from 'react-icons/rx';
import * as IoIcons from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './styles/SideBar.css';
import Logo from './assets/SSNote-Logo-gray.png';
import NoteSearch from "./NoteSearch";

function Sidebar({navigate, userNotes}) {

  return (
    <div>
      
    <div className='sidebar'>
      <div className='leftSide'>
        
        <img id='ssnote-logo' src={Logo} alt="ssnote-logo" />
      </div>
    

        <Link to='/dashboard' id='dashboard'>
            <RxIcons.RxDashboard className='icons' />
            Dashboard
        </Link>
        <Link to='/settings' id='settings'>
            <IoIcons.IoSettingsOutline className='icons' />
            Settings
        </Link>
        <hr />
        <NoteSearch userNotes={userNotes} navigate={navigate} />
      


    </div>
    </div>
  )
}

export default Sidebar;

