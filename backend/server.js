const express = require('express');
const cors = require('cors');
const analyzeSentiment = require('./sentiment/analyze');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/sentiment', async (req, res) => {
  const { text } = req.body;
  const result = await analyzeSentiment(text);
  res.json(result);
});
app.get("/", (req, res) => {
  res.send("CineAnalyzer backend is working!");
});

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
