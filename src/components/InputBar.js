import React, {useState} from "react";

const InputBar = ({onSend}) => {
    const [input, setInput] = useState("");
    
    const handleSend = () => {
        onSend(input);
        setInput("");
    }

    const handleKey = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    }

    return (
        <div className="input-bar">
            <input
            type="text"
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            placeholder = "Type a message or /dog"
            className="input-field"
            onKeyDown={handleKey}
            />
            <button onClick={handleSend} className="send-button">Send</button>
        </div>
    )
}

export default InputBar;