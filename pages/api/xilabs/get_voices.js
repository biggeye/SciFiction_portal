import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const url = 'https://api.elevenlabs.io/v1/voices';
    const headers = {
      'accept': 'application/json',
      'xi-api-key': process.env.NEXT_PUBLIC_XILABS_API_KEY,
    };

    try {
      const response = await axios.get(url, { headers });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json(error.response?.data);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
