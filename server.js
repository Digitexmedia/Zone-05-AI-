const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, ZONE 05 encountered a glitch." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ZONE 05 backend is live at http://localhost:${PORT}`));
