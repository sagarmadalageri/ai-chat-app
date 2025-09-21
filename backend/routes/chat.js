import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse('');

    try {
      // Make a POST request to YOUR backend server
      const res = await axios.post('http://localhost:3001/chat', {
        message: message // Send the user's message in the request body
      });

      // Extract the text from the Gemini response
      const aiText = res.data.candidates[0].content.parts[0].text;
      setResponse(aiText);

    } catch (err) {
      // This will catch errors like "Failed to fetch response from AI" from your server
      const errorMessage = err.response ? err.response.data.error : 'Error connecting to the server.';
      setError(errorMessage);
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>

      {response && <div><strong>AI:</strong> <p>{response}</p></div>}
      {error && <div style={{ color: 'red' }}>⚠️ {error}</div>}
    </div>
  );
}

export default Chatbot;