import React from "react";

const DisplayContent = ({ filteredData }) => {
    console.log(filteredData);
  return (
    <div>
      <h2>Summary</h2>
      {filteredData.blocks.map((block, index) => (
        <p key={index}>{block.text}</p>
      ))}
    </div>
  );
};

export default DisplayContent;
