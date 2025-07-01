require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAIApi, Configuration } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// Generate slide and secret goal
app.post('/api/generate-slide', async (req, res) => {
  const prompt = `
Generate a funny, meme-filled classroom presentation slide title and a related secret goal for a game called "Stall for Time". 
Format as JSON: {"slideTitle": "<slide title>", "secretGoal": "<secret goal>"}. 
Keep it under 10 words each.
  `;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role:'user', content: prompt}],
      max_tokens: 100,
      temperature: 1,
    });
    const content = response.data.choices[0].message.content.trim();
    res.json(JSON.parse(content));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate teacher commentary
app.post('/api/commentary', async (req, res) => {
  const { speech, slideTitle, secretGoal, goalCompleted } = req.body;
  const commentaryPrompt = `
You're a sarcastic, meme-savvy teacher in a game called "Stall for Time". 
Given the student's speech: "${speech}", the slide topic: "${slideTitle}", and the secret goal: "${secretGoal}" (completed: ${goalCompleted}),
write a short, funny, meme-rich reaction (max 40 words).
  `;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role:'user', content: commentaryPrompt}],
      max_tokens: 100,
      temperature: 1,
    });
    const content = response.data.choices[0].message.content.trim();
    res.json({ commentary: content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API server running on ${PORT}`));