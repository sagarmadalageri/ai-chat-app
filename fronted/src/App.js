import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Optional: for styling

function App() {
  const [inputValue, setInputValue] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    
    // Clear previous state
    setChatResponse('');
    setError('');
    setIsLoading(true);

    try {
      // The URL must match your backend server's address and port, plus the '/chat' route
      const backendUrl = 'http://localhost:3001/chat';

      // Send the user's input to your backend server
      const response = await axios.post(backendUrl, {
        message: inputValue
      });

      // Extract the text from the Gemini response structure
      const aiText = response.data.candidates[0].content.parts[0].text;
      setChatResponse(aiText);

    } catch (err) {
      // Display a user-friendly error message
      const errorMessage = err.response ? err.response.data.error : 'Cannot connect to the server. Is it running?';
      setError(errorMessage);
      console.error('Frontend Error:', err);
    } finally {
      setIsLoading(false); // Stop loading, whether it succeeded or failed
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Chat Assistant</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything..."
            disabled={isLoading} // Disable input while waiting for a response
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </form>
        
        <div className="response-area">
          {error && <p className="error">⚠️ Error: {error}</p>}
          {chatResponse && <p className="response">{chatResponse}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;