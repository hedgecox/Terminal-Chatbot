const ColorLookup = {
	0: "#0C0C0C",
	1: "#0037DA",
	2: "#13A10E",
	3: "#3A96DD",
	4: "#C50F1F",
	5: "#881798",
	6: "#C19C00",
	7: "#CCCCCC",
	8: "#767676",
	9: "#3B78FF",
	a: "#16C60C",
	b: "#61D6D6",
	c: "#E74856",
	d: "#B4009E",
	e: "#F9F1A5",
	f: "#F2F2F2"
};
const helpColor = `Sets the default console foreground and background colors.

COLOR [attr]

  attr          Specifies color attribute of console output   

Color attributes are specified by TWO hex digits -- the first
corresponds to the background; the second the foreground.  Each digit
can be any of the following values:

    0 = Black       8 = Gray
    1 = Blue        9 = Light Blue
    2 = Green       A = Light Green
    3 = Aqua        B = Light Aqua
    4 = Red         C = Light Red
    5 = Purple      D = Light Purple
    6 = Yellow      E = Light Yellow
    7 = White       F = Bright White`;

const Computer = (text, setLines, setChatbotActive) => {
	const compute = () => {
		const lowerText = text.toLowerCase();
		const words = lowerText.indexOf(" ") > 0 ? lowerText.split(" ") : [lowerText];
		switch (words[0]) {
			case "help":
				switch (words[1]) {
					case "color":
						return helpColor;
					default:
						return `For more information on a specific command, type HELP command-name
color           Sets the default console foreground and background colors.
cls             Clear the screen`;
				}

			case "color":
				if (words[1] && words[1].match(/^[0-9a-f]{2}$/)) {
					document.documentElement.style.setProperty(
						"--terminal_bg",
						ColorLookup[words[1][0]]
					);
					document.documentElement.style.setProperty(
						"--terminal_fg",
						ColorLookup[words[1][1]]
					);
					return null;
				} else {
					document.documentElement.style.setProperty("--terminal_bg", ColorLookup["0"]);
					document.documentElement.style.setProperty("--terminal_fg", ColorLookup["f"]);
					return helpColor;
				}
			case "chat":
				setChatbotActive(true);
				return "Activating Chatbot, Press CTRL + C to exit";
			default:
				return `'${text}' is not recognized as an internal or external command, operable program or batch file.`;
		}
	};

	const response = compute();
	if (response) {
		setLines(lines => [...lines, { text: response, by: 0 }]);
	}
};

export default Computer;
