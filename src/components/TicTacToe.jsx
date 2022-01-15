import React, {
  useState,
  useReducer,
  useCallback,
  createContext,
  useEffect,
} from "react";
import Table from "./Table";
export const ReducerContext = createContext();
export const SET_WINNER = "SET_WINNER";
export const CHANGE_TURN = "CHANGE_TURN";
export const CELL_CLICK = "CELL_CLICK";
export const RESET_GAME = "RESET_GAME";
const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  rowIndex: -1,
  cellIndex: -1,
};
const reducer = (state, action) => {
  if (action.type === SET_WINNER) {
    return {
      ...state,
      winner: action.turn,
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  }
  if (action.type === CHANGE_TURN) {
    return {
      ...state,
      turn: state.turn === "O" ? "X" : "O",
    };
  }
  if (action.type === CELL_CLICK) {
    const tableData = [...state.tableData];
    tableData[action.rowIndex] = [...tableData[action.rowIndex]];
    tableData[action.rowIndex][action.cellIndex] = state.turn;

    return {
      ...state,
      rowIndex: action.rowIndex,
      cellIndex: action.cellIndex,
      tableData: tableData,
    };
  }
  if (action.type === RESET_GAME) {
    return {
      ...state,
      turn: "O",
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  }
};
const TicTacToc = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, rowIndex, cellIndex } = state;
  useEffect(() => {
    if (rowIndex !== -1 || rowIndex !== -1) {
      let win = false;
      if (
        tableData[rowIndex][0] === turn &&
        tableData[rowIndex][1] === turn &&
        tableData[rowIndex][2] === turn
      ) {
        win = true;
      }
      if (
        tableData[0][cellIndex] === turn &&
        tableData[1][cellIndex] === turn &&
        tableData[2][cellIndex] === turn
      ) {
        win = true;
      }
      if (
        tableData[0][0] === turn &&
        tableData[1][1] === turn &&
        tableData[2][2] === turn
      ) {
        win = true;
      }
      if (
        tableData[0][2] === turn &&
        tableData[1][1] === turn &&
        tableData[2][0] === turn
      ) {
        win = true;
      }
      if (win) {
        dispatch({ type: SET_WINNER, turn });
      } else {
        let all = true;
        tableData.forEach((row) => {
          row.forEach((cell) => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          dispatch({ type: RESET_GAME });
        } else {
          dispatch({ type: CHANGE_TURN });
        }
      }
    }
  }, [tableData]);
  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <Table tableData={state.tableData} />
      {turn && <div>{turn} 턴</div>}
      {winner && <div>{winner} 승리</div>}
    </ReducerContext.Provider>
  );
};
export default TicTacToc;
