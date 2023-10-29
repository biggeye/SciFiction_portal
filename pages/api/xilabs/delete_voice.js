import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { voice_id } = req.body;
    const url = `https://api.elevenlabs.io/v1/voices/${voice_id}`;
    const headers = {
      "Accept": "application/json",
      "xi-api-key": process.env.NEXT_PUBLIC_XILABS_API_KEY,
    };

    try {
      const response = await axios.delete(url, { headers });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json(error.response?.data);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
