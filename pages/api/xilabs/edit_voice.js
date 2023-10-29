import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, labels, description, voice_id, file1, file2 } = req.body;

    const url = `https://api.elevenlabs.io/v1/voices/${voice_id}/edit`;
    const headers = {
      "Accept": "application/json",
      "xi-api-key": process.env.NEXT_PUBLIC_XILABS_API_KEY,
    };
    const formData = new FormData();
    formData.append('name', name);
    formData.append('labels', labels);
    formData.append('description', description);
    if (file1) {
      formData.append('file1', file1, { filename: file1.name, contentType: 'audio/mpeg' });
    }
    if (file2) {
      formData.append('file2', file2, { filename: file2.name, contentType: 'audio/mpeg' });
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          ...headers,
          ...formData.getHeaders()
        }
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json(error.response?.data);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
