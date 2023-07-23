import React from 'react'
import EditorComponent from './EditorComponent';
import ConvertButton from './ConvertButton';
import 'bootstrap/dist/css/bootstrap.css';
import WithAuthCheck from "../WithAuthCheck";
import { useParams } from "react-router-dom";

function Notepage() {
  const { noteTitle } = useParams();
  return (
    <div className="App">
      <EditorComponent noteTitle={noteTitle} />
      <br />
      <ConvertButton noteTitle={noteTitle}/>
    </div>
  );
}


export default WithAuthCheck(Notepage);