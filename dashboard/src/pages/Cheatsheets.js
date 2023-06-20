import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cheatsheets.css';
import cover from '../assets/What-is-A4-size copy.jpg';
import { IoEllipsisVerticalSharp } from "react-icons/io5";

function Cheatsheets() {
  return (
    <div className='cheatsheets'>
      <p id='cheatsheets-title'>Cheatsheets</p>
      <hr />
      <div className='cheatsheet-files'>
        <Link className='cheatsheet' to='/file1'>
            <span className='cheatsheet-title'>File1</span>
            <br />
            <img src={cover} />
        </Link>

        <br />

        <Link className='cheatsheet' to='/file2'>
            <span className='cheatsheet-title'>File2</span>
            <br />
            <img src={cover} />
        </Link>
      </div>
      
      
    </div>
  )
}