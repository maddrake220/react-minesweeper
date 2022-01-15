import { useCallback, useEffect, useState } from "react";
import Button from "./Button";

const Timer = ({ timerStart }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (timerStart) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerStart]);
  return <span>{time}</span>;
};
export default Timer;
