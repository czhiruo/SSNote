import React from "react";
import "./DisplayContent.css";

const DisplayContent = ({ filteredData }) => {
  console.log(filteredData);
  return (
    <div>
      <h2 className="title">Summary</h2>
      {/* Apply the "indented-paragraph" class to the <p> elements */}
      {filteredData.blocks.map((block, index) => (
        <p key={index} className="indented-paragraph">
          {block.text}
        </p>
      ))}
      <br></br>
      <br></br>
    </div>
  );
};

export default DisplayContent;
