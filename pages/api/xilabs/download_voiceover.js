import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { voiceoverId } = req.body;
    const url = "https://api.elevenlabs.io/v1/history/download";
    const headers = {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "xi-api-key": process.env.NEXT_PUBLIC_XILABS_API_KEY,
    };
    const data = {
      "history_item_ids": [voiceoverId]
    };

    try {
      const response = await axios.post(url, data, { headers });
      const encodedContent = Buffer.from(response.data).toString('base64');
      res.status(response.status).send(encodedContent);
    } catch (error) {
      res.status(error.response?.status || 500).send(error.response?.data);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
