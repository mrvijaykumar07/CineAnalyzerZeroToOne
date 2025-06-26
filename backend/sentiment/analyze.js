const axios = require('axios');
require('dotenv').config(); 


const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function analyzeSentiment(text) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    // ✅ Print full raw response for debugging
    console.log("🟨 Hugging Face Raw JSON Response:");
    console.log(JSON.stringify(response.data, null, 2));

    // ✅ Ensure we extract the correct data
    const rawOutput = response.data;

    // Hugging Face sometimes returns: [ [ {...}, {...}, {...} ] ]
    const output = Array.isArray(rawOutput) && Array.isArray(rawOutput[0])
      ? rawOutput[0]
      : rawOutput;

    if (!Array.isArray(output)) {
      throw new Error("Unexpected Hugging Face response format.");
    }

    const topLabel = output.reduce((max, curr) =>
      curr.score > max.score ? curr : max
    );

    let sentiment;
    if (topLabel.label === 'LABEL_0') sentiment = 'Negative';
    else if (topLabel.label === 'LABEL_1') sentiment = 'Neutral';
    else if (topLabel.label === 'LABEL_2') sentiment = 'Positive';
    else sentiment = 'Unknown';

    const result = {
      sentiment,
      explanation: `Model is ${Math.round(topLabel.score * 100)}% confident this is ${sentiment.toLowerCase()}.`
    };

    console.log("✅ Final Parsed Sentiment:", result);
    return result;

  } catch (error) {
    console.error('❌ Error from Hugging Face:', error.message);

    if (error.response) {
      console.error("❌ API Error Response:", error.response.data);
    }

    return {
      sentiment: 'Unknown',
      explanation: 'Could not analyze due to API error or unexpected format.'
    };
  }
}

module.exports = analyzeSentiment;
