import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { offer, streamId, sessionId } = req.body;
    console.log("Received request to start stream with parameters:", { offer, streamId, sessionId });
    
    // Send the received offer to the external API and get the answer
    console.log("Sending SDP offer to external API...");
    const sdpResponse = await fetch(`https://api.d-id.com/talks/streams/${streamId}/sdp`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        offer: offer,
        session_id: sessionId,
      }),
    });

    const data = await sdpResponse.json();
    console.log("Received response from external API for SDP:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
