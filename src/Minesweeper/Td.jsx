import React, { useCallback, useContext, useRef } from "react";
import { CELL_CLICK, ReducerContext } from "./Minesweeper";
const Td = ({ td, rowIndex, cellIndex }) => {
  const context = useContext(ReducerContext);

  const tdRef = useRef(null);
  const [, dispatch] = context;
  const click = () => {
    dispatch({ type: CELL_CLICK, rowIndex, cellIndex, td, tdRef });
  };
  return (
    <td onClick={click} ref={tdRef}>
      {td}
    </td>
  );
};
export default Td;

// tdRef.current.style.backgroundColor = "red";
