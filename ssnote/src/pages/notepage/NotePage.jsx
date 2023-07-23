import React from 'react'
import EditorComponent from './EditorComponent';
import ConvertButton from './ConvertButton';
import 'bootstrap/dist/css/bootstrap.css';
import WithAuthCheck from "../WithAuthCheck";

function Notepage() {
  return (
    <div className="App">
      <EditorComponent />
      <br />
      <ConvertButton />
    </div>
  );
}


export default WithAuthCheck(Notepage);