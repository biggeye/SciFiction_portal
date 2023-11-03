import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { id, session_id, answer } = req.body;
    // Send the received offer to the external API and get the answer
    console.log("Sending SDP offer to external API...");
    
    const sdpResponse = await fetch(`https://api.d-id.com/talks/streams/${id}/sdp`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic YjNkbGJrQnpZMmxtYVdOMGFXOXVMbU52YlE6MDFPVkE1emdGWFhfOXdmSkhVZTJ5'
      },
      body: JSON.stringify({
        session_id: session_id,
        answer: answer,
      }),
    });

    const data = await sdpResponse.json();
    console.log('start_stream Received response from external API for SDP:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error("start_stream Error in handler:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
