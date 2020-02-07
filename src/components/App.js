import React, { useState } from "react";
import "./App.scss";
import TerminalLines from "./TerminalLines";
import TerminalInput from "./TerminalInput";

const App = () => {
  const [Lines, setLines] = useState([
    {
      text: "Welcome to the console, Type 'Help' or 'Chat' to get started!",
      by: 0
    }
  ]);

  return (
    <>
      <TerminalLines lines={Lines} />
      <TerminalInput setLines={setLines} />
    </>
  );
};

export default App;
