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
      authorization: 'Basic YjNkbGJrQnpZMmxtYVdOMGFXOXVMbU52YlE6MDFPVkE1emdGWFhfOXdmSkhVZTJ5'
    },
    body: JSON.stringify({
      source_url: source_url
    })
  };
  
  
  try {
    const response = await fetch('https://api.d-id.com/talks/streams', options);
    const data = await response.json();
    console.log('create_stream:', data); // Added identifier here
    res.status(200).json(data);
  } catch (error) {
    console.error('create_stream:', error); // Updated to use console.error and added identifier
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
