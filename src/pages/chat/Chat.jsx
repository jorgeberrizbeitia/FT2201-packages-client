import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllMessagesService } from "../../services/chat.services";

import io from "socket.io-client";
let socket;

function Chat() {

  const [ allMessages, setAllMessages ] = useState([])
  const [ text, setText ] = useState("")

  const { chatId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getAllMessages()
    socketConnection()
  }, [])

  const socketConnection = () => {

    // establecemos el socket
    const storedToken = localStorage.getItem("authToken")
    socket = io.connect("http://localhost:5005", {
      extraHeaders: { Authorization: `Bearer ${storedToken}` }
    })

    socket.emit("join_chat", chatId)

    socket.on("receive_message", (newMessage) => {

      setAllMessages(previousState => {
        const newState = [...previousState, newMessage]
        return newState
      })

    })

  }

  const getAllMessages = async () => {
    // here we will get all messages from the Server/DB via a Service

    try {
      const response = await getAllMessagesService(chatId)
      setAllMessages(response.data)
    } catch(err) {
      navigate("/error")
    }
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const sendMessage = () => {
    console.log("Trying to send a message!")
    const messageObj = { text, chatId }
    socket.emit("send_message", messageObj)
    setText("")
  }

  return (
    <div>
      <h3>You're in the Chat Page </h3>

        <div>
          {allMessages.map((eachMessage) => {
              return (
                <div key={eachMessage._id}>
                  <p>{eachMessage.sender.name}: {eachMessage.text}</p>
                </div>
              );
            })}
        </div>

        <div>
          <input
            type="text"
            placeholder="Message..."
            name="text"
            value={text}
            onChange={handleChange}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  );
}

export default Chat;
