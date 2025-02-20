import React from 'react';

const ChatWindow = ({messages}) => (

    <div className="chat-window">
            {messages.map((msg)=> (
                <div key={msg.id} className="chat-message">
                    {msg.type === 'text' && <p>{msg.content}</p>}
                    {msg.type === 'image' && <img src={msg.content} alt="Dog" className="dog-image" />}
                </div>
            ))}
    </div>
)

export default ChatWindow;