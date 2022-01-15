import React, { useCallback, useContext, useRef } from "react";
import { CELL_CLICK, ReducerContext } from "./TicTacToe";
const Td = ({ td, rowIndex, cellIndex }) => {
  const context = useContext(ReducerContext);
  const [, dispatch] = context;
  const tdRef = useRef(null);
  const click = () => {
    tdRef.current.style.backgroundColor = "#fffff";
    //dispatch({ type: CELL_CLICK, rowIndex, cellIndex });
  };
  return (
    <td onClick={click} ref={tdRef}>
      {td}
    </td>
  );
};
export default Td;
