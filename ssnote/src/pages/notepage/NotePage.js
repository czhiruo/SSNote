import React from 'react'
import EditorComponent from './EditorComponent';
import ConvertButton from './ConvertButton';
import 'bootstrap/dist/css/bootstrap.css';
import WithAuthCheck from "../WithAuthCheck";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import DisplayContent from './DisplayContent';
// import './Note.css';

function Notepage() {
  const { noteTitle } = useParams();
  const [filteredData, setFilteredData] = useState(null);

  return (
    <div className="App">
      <EditorComponent noteTitle={noteTitle} />
      {/* Pass the setFilteredData function to ConvertButton */}
      <ConvertButton noteTitle={noteTitle} setFilteredData={setFilteredData} />
      {/* Pass the filteredData state to FilteredDataDisplay */}
      {filteredData && <DisplayContent filteredData={filteredData} />}
    </div>
  );
}


export default Notepage;