import React from "react";
const Button = React.memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

export default Button;
