import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { source_url } = req.body;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: process.env.NEXT_PUBLIC_DID_API_KEY,
    body: JSON.stringify({ source_url }),
  }};
  
  try {
    const response = await fetch('https://api.d-id.com/talks/streams', options);
    const data = await response.json();
    console.log("Received response from external API:", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
