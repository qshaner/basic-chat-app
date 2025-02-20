import React, {useState, useEffect, useCallback} from 'react';
import {v4 as uuidv4} from "uuid";
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import './App.css';

const WEBSOCKET_SERVER = "ws://localhost:8080";


const App = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  //Initialize websocket connection
  useEffect(()=> {
    const ws = new WebSocket(WEBSOCKET_SERVER);

    ws.onopen = () => console.log("WebSocket connection established");
    ws.onclose = () => console.log("WebSocket connection closed");
    ws.onerror = (error) => console.error("WebSocket ettor: ", error);

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prevMessages)=> [...prevMessages, message]);
      }
      catch (error) {
        console.error("Error parsing WebSocket message: ", error)
      }
    }

    setSocket(ws);

    return()=> ws.close(); //cleanup WebSocket on component unmount
  }, [])

  //send message via WebSocket
  const sendMessage = useCallback(
    async (input) => {
      if (!input.trim() || !socket) return;
    
      let message;
      try {
        if (input === "/dog") {
          console.log("DOG")
          //fetch random dog image
          const response = await fetch("https://dog.ceo/api/breeds/image/random");
          const data = await response.json();
          message = {id: uuidv4(), content: data.message, type: "image"}
        }
        else {
          message = {id: uuidv4(), content: input, type: "text"}
        }

        socket.send(JSON.stringify(message));
        setMessages((prevMessages) => [...prevMessages, message])
      }
      catch (error) {
        console.error("Error sending message: ", error)
      }
    }, [socket]
    
  )

  return (
    <div className="app-container">
      <h1>Real-Time Chat</h1>
      <ChatWindow messages={messages}/>
      <InputBar onSend={sendMessage} />
    </div>
  );
}

export default App;
