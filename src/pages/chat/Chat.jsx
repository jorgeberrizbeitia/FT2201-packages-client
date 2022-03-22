import { useState, useEffect } from "react";

function Chat() {

  const [ allMessages, setAllMessages ] = useState([])
  const [ text, setText ] = useState("")

  useEffect(() => {
    getAllMessages()
  }, [])

  const getAllMessages = async () => {
    // here we will get all messages from the Server/DB via a Service
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const sendMessage = () => {
    console.log("Trying to send a message!")
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
