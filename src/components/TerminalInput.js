import React, { useEffect, useRef, useState } from 'react';
import computer from './computer';

const TerminalInput = (props) => {
    const tInput = useRef();
    const [inputText, setInputText] = useState("")

    useEffect(() => {
        const ButtonClick = () => tInput.current.focus();

        tInput.current.focus();
        window.addEventListener('click', ButtonClick)
    },[])

    
    const FormSubmit = (e) => {
        e.preventDefault();
        if(inputText){ //Only update if input text is valid
            props.setLines(lines => [...lines, {text: inputText, by: 1}]);
            computer(inputText, props.setLines)
            setInputText("");
        }
    }

    return (
        <form onSubmit={FormSubmit}>
            <span>C:\></span>
            <input onChange={e => setInputText(e.target.value)} value={inputText} ref={tInput} style={{width: "calc(100% - 70px)", border: "none", marginLeft: "10px"}} />
        </form>
    )
}

export default TerminalInput;