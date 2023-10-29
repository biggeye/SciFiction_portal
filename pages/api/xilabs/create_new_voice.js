import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, labels, description, file1 } = req.body;

    const url = "https://api.elevenlabs.io/v1/voices/add";
    const headers = {
      "Accept": "application/json",
      "xi-api-key": process.env.NEXT_PUBLIC_XILABS_API_KEY
    };
    const formData = new FormData();
    formData.append('name', name);
    formData.append('labels', labels);
    formData.append('description', description);
    formData.append('files', file1, { filename: file1.name, contentType: 'audio/mpeg' });

    try {
      const response = await axios.post(url, formData, {
        headers: {
          ...headers,
          ...formData.getHeaders()
        }
      });

      if (response.status !== 200) {
        console.error(`API call failed with status code ${response.status}`);
        res.status(400).json(response.data);
      } else {
        res.status(200).json(response.data);
      }
    } catch (error) {
      res.status(error.response?.status || 500).json(error.response?.data);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
