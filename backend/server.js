const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server error: API key is not configured.' });
  }
  if (!message) {
    return res.status(400).json({ error: 'Client error: Message is required.' });
  }

  // ---> START of the block you asked about. It's already here.
  try {
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const requestPayload = {
      contents: [{
        parts: [{
          text: message
        }]
      }]
    };

    // This is the line that tries to contact the Gemini API.
    const geminiResponse = await axios.post(GEMINI_API_URL, requestPayload);

    // If successful, it sends the response back to the client.
    res.status(200).json(geminiResponse.data);

  } catch (error) {
    // If the 'try' block fails, this 'catch' block runs.
    console.error('Error calling Gemini API:', error.response ? error.response.data.error : error.message);
    res.status(500).json({ error: 'Failed to fetch response from the AI service.' });
  }
  // ---> END of the block you asked about.
});

app.listen(PORT, () => {
  console.log(`✅ Server is running and listening on http://localhost:${PORT}`);
});