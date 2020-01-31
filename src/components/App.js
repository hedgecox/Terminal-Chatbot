import React, { useState } from "react";
import "./App.scss";
import TerminalLines from "./TerminalLines";
import TerminalInput from "./TerminalInput";
import Chat from "./Chat";

const App = () => {
	//API: AIzaSyAqnLOKmOBCrzpLNqacRqKxZFwzCqmEktU

	const [Lines, setLines] = useState([{ text: "Welcome to the console!", by: 0 }]);

	return (
		<>
			<Chat />
			<TerminalLines lines={Lines} />
			<TerminalInput setLines={setLines} />
		</>
	);
};

export default App;
