const Computer = (text, print) => {
    const compute = () => {
        switch(text){
            default:
                return `'${text}' is not recognized as an internal or external command, operable program or batch file.`
        }
    }

    

    
    print(lines => [...lines, {text: compute(), by: 0}]);
}

export default Computer;