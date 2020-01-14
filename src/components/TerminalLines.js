import React from 'react';

const TerminalLines = ({lines}) => {
    return lines.map((line, i) => {
    return <p key={i}>{line.by ? "C:\\> " : ""}{line.text}</p>
    })
}

export default TerminalLines;