import React, { useEffect, useRef, useState } from "react";
import computer from "./computer";
import useDialogflow from "./useDialogflow";

const TerminalInput = ({ setLines }) => {
	const tInput = useRef();
	const [inputText, setInputText] = useState("");
	const [chatbotActive, setChatbotActive] = useState(false);
	const [chatbotQuery, setChatbotQuery] = useState("");
	const { loading, response } = useDialogflow(chatbotQuery);

	//Ensure the terminal input keeps focus
	useEffect(() => {
		let ctrlDown = false;

		const ctrl = 17,
			cmd = 91,
			c = 67;
		const FocusInput = () => tInput.current.focus();

		const KeyDownEvent = e => {
			if (e.keyCode === ctrl || e.keyCode === cmd) ctrlDown = true;
			if (ctrlDown && e.keyCode === c && chatbotActive) {
				setLines(lines => [...lines, { text: "Chatbot Killed", by: 0 }]);
				setChatbotActive(false);
			}
		};

		const KeyUpEvent = e => {
			if (e.keyCode === ctrl || e.keyCode === cmd) ctrlDown = false;
		};

		//Add event Listener for Click Events
		window.addEventListener("click", FocusInput);
		window.addEventListener("keydown", KeyDownEvent);
		window.addEventListener("keyup", KeyUpEvent);

		//Focus on load
		FocusInput();

		return () => {
			window.removeEventListener("click", FocusInput);
			window.removeEventListener("keydown", KeyDownEvent);
			window.removeEventListener("keyup", KeyUpEvent);
		};
	}, [chatbotActive, setLines]);

	useEffect(() => {
		if (response !== null) {
			if (loading) {
				setLines(lines => [...lines, { text: response, by: 0 }]);
			} else {
				setLines(lines => {
					const newLines = [...lines];
					newLines[newLines.length - 1] = { text: response, by: 0 };
					return newLines;
				});
			}
		}
	}, [response, loading, setLines]);

	const FormSubmit = e => {
		e.preventDefault();
		if (inputText && chatbotActive) {
			setLines(lines => [...lines, { text: inputText, by: 1 }]);
			setChatbotQuery(inputText);
			setInputText("");
		} else if (inputText) {
			setLines(lines => [...lines, { text: inputText, by: 1 }]);
			computer(inputText, setLines, setChatbotActive);
			setInputText("");
		}
	};

	return (
		<form onSubmit={FormSubmit}>
			<span>C:\></span>
			<input
				onChange={e => setInputText(e.target.value)}
				value={inputText}
				ref={tInput}
				style={{ width: "calc(100% - 70px)", border: "none", marginLeft: "10px" }}
			/>
		</form>
	);
};

export default TerminalInput;
