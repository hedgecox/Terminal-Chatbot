const Computer = (text, print) => {
    const compute = () => {

        const words = text.toLowerCase().indexOf(' ') > 0 ? text.split(' ') : [text];

        switch (words[0]) {
            case "help":
                switch (words[1]) {
                    case "color":
                        return "help color..."
                    default:
                        return `For more information on a specific command, type HELP command-name
color           here is something
hello           say hello human`
                }

            case "color":
                if (words[1]) {
                    if (words[1].match(/^[0-9a-f]{2}$/)) {
                        return "Regex is happy, Update the colors"
                    } else {
                        return "That wasnt a valid color parameter..."
                    }
                } else {
                    return "default"
                }

            default:
                return `'${text}' is not recognized as an internal or external command, operable program or batch file.`;
        }
    }




    print(lines => [...lines, { text: compute(), by: 0 }]);
}

export default Computer;