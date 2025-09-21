// frontend/src/components/Chat.js
import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = { sender: "You", text: message };
    setChatHistory((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message });
      const botReply = { sender: "Bot", text: res.data.reply };
      setChatHistory((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [...prev, { sender: "Bot", text: "⚠️ Error connecting to server" }]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", textAlign: "center" }}>
      <h2>Chat with AI 🤖</h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          minHeight: "200px",
          textAlign: "left",
          overflowY: "auto",
        }}
      >
        {chatHistory.map((msg, i) => (
          <p key={i}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
        {loading && <p><em>Bot is typing...</em></p>}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ padding: "8px", width: "70%" }}
        />
        <button onClick={sendMessage} style={{ padding: "8px 12px", marginLeft: "5px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
