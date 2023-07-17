// PopupMenu.js
import React from 'react';
import './styles/PopupMenu.css'; // We will create this CSS file in the next step

const PopupMenu = ({ onClose }) => {
  return (
    <div className="popup-menu">
      <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PopupMenu;




