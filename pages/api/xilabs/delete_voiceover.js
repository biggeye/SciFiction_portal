import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { voiceoverId } = req.body;
    const url = `https://api.elevenlabs.io/v1/history/${voiceoverId}`;
    const headers = {
      "xi-api-key": process.env.NEXT_PUBLIC_XILABS_API_KEY,
    };

    try {
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        res.status(200).send("Voiceover deleted.");
      } else {
        res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(error.response?.status || 500).send(error.response?.data);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
