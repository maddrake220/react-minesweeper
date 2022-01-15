import React from "react";
import Td from "./Td";
const Tr = ({ tableData, rowIndex }) => {
  return (
    <tr>
      {tableData[rowIndex].map((td, cellIndex) => (
        <Td key={cellIndex} td={td} rowIndex={rowIndex} cellIndex={cellIndex} />
      ))}
    </tr>
  );
};
export default Tr;

// <tr>
//   <Td></Td>
//   <Td></Td>
//   <Td></Td>
// </tr>;
