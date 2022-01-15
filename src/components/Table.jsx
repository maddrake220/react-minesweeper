import React from "react";
import Tr from "./Tr";
const Table = ({ tableData }) => {
  return (
    <table>
      <tbody>
        {tableData.map((tr, rowIndex) => (
          <Tr key={rowIndex} tableData={tableData} rowIndex={rowIndex} />
        ))}
      </tbody>
    </table>
  );
};
export default Table;
