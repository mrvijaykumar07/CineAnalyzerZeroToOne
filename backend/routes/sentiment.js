const express = require('express');
const analyzeSentiment = require('../sentiment/analyze');

const router = express.Router();

router.post('/', (req, res) => {
  const { text } = req.body;
  const result = analyzeSentiment(text);
  res.json(result);
});

module.exports = router;
