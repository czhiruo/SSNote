import React from 'react'
import EditorComponent from './EditorComponent';
import ConvertButton from './ConvertButton';
import 'bootstrap/dist/css/bootstrap.css';

function Notepage() {
  return (
    <div className="App">
      <EditorComponent />
      <ConvertButton />
    </div>
  );
}


export default Notepage;