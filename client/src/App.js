import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './styles.css';

const socket = io('http://localhost:5000');

function App() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (msg.trim()) {
      socket.emit('send_message', msg);
      setMsg('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off();
  }, []);

  return (
    <div className="chat-container">
      <h2>💬 Real-Time Chat</h2>
      <div className="chat-box">
        {chat.map((c, i) => (
          <p key={i} className="chat-msg">{c}</p>
        ))}
      </div>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
