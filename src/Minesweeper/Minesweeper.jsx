import React, {
  useState,
  useReducer,
  useCallback,
  createContext,
  useEffect,
  useRef,
} from "react";
import Button from "./Button";
import Table from "./Table";
import Timer from "./Timer";
export const ReducerContext = createContext();
export const CELL_CLICK = "CELL_CLICK";
export const RESET_GAME = "RESET_GAME";
export const SET_MAP = "SET_MAP";
export const initialState = {
  tableData: [],
  lose: false,
  start: false,
};

const reducer = (state, action) => {
  if (action.type === SET_MAP) {
    const row = parseInt(action.row);
    const col = parseInt(action.col);
    const initialTable = Array.from(Array(row), () => Array(col).fill(null));
    const minePlacedTable = initialTable.map((v) =>
      v.map((t) => (t = Math.floor(Math.random() * 10) === 0 ? "X" : ""))
    );
    return {
      ...state,
      start: action.start,
      tableData: minePlacedTable,
    };
  }
  if (action.type === CELL_CLICK) {
    if (action.td === "X") {
      action.tdRef.current.style.backgroundColor = "red";
      return {
        ...state,
        lose: true,
      };
    } else {
      const tableData = [...state.tableData];
      let count = 0;
      if (tableData[action.rowIndex - 1][action.cellIndex - 1] === "X") {
        count++;
      }
      if (tableData[action.rowIndex - 1][action.cellIndex] === "X") {
        count++;
      }
      if (tableData[action.rowIndex - 1][action.cellIndex + 1] === "X") {
        count++;
      }
      if (tableData[action.rowIndex][action.cellIndex - 1] === "X") {
        count++;
      }
      if (tableData[action.rowIndex][action.cellIndex + 1] === "X") {
        count++;
      }
      if (tableData[action.rowIndex + 1][action.cellIndex - 1] === "X") {
        count++;
      }
      if (tableData[action.rowIndex + 1][action.cellIndex] === "X") {
        count++;
      }
      if (tableData[action.rowIndex + 1][action.cellIndex + 1] === "X") {
        count++;
      }
      action.tdRef.current.style.backgroundColor = "white";
      tableData[action.rowIndex][action.cellIndex] = count;
    }
    return {
      ...state,
    };
  }
};
const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timerStart, setTimerStart] = useState(false);
  const rowRef = useRef(null);
  const colRef = useRef(null);
  const mineRef = useRef(null);
  const gameStart = useCallback(() => {
    if (
      rowRef.current.value === "" ||
      colRef.current.value === "" ||
      mineRef.current.value === ""
    ) {
      alert("값을 입력하세요");
      return;
    }
    setTimerStart(true);
    dispatch({
      type: SET_MAP,
      start: true,
      row: rowRef.current.value,
      col: colRef.current.value,
      mine: mineRef.current.value,
    });
  }, []);
  const { start, lose } = state;
  useEffect(() => {
    if (lose) {
      alert("YOu LosE!");
    }
  }, [lose]);

  return (
    <>
      <div>
        <input placeholder="row" ref={rowRef}></input>
        <input placeholder="col" ref={colRef}></input>
        <input placeholder="mine" ref={mineRef}></input>
      </div>
      <Timer timerStart={timerStart} />
      <Button onClick={gameStart}>게임시작</Button>
      <ReducerContext.Provider value={[state, dispatch]}>
        {start && <Table tableData={state.tableData} />}
      </ReducerContext.Provider>
    </>
  );
};
export default Minesweeper;
