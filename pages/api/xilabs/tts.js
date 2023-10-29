import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { script, voice_id, stability_amt, similarity_amt } = req.body;
    const model_id = 'eleven_monolingual_v1';
    const voice_settings = {
      similarity_boost: similarity_amt,
      stability: stability_amt,
    };

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;
    const headers = {
      'accept': 'audio/mpeg',
      'xi-api-key': process.env.XI_API_KEY,
      'Content-Type': 'application/json',
    };
    const data = {
      model_id,
      text: script,
      voice_settings,
    };

    try {
      const response = await axios.post(url, data, { headers });
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).send(error.response?.data);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
