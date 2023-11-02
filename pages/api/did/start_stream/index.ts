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
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcm9kdWN0X2lkIjoicHJvZF9MemxmZWNpR1ppWktMbSIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoicHJvIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoic3ViXzFOUmQ2bUp4RUtaMnpBeW5SejBqaVlLYiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2JpbGxpbmdfaW50ZXJ2YWwiOiJtb250aCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3BsYW5fZ3JvdXAiOiJkZWlkLXBybyIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2lkIjoicHJpY2VfMU1EbHRwSnhFS1oyekF5bkdiZ1dqWnVhIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IjgwIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9zdWJzY3JpcHRpb25faWQiOiIiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3ByaWNlX2NyZWRpdHMiOiIiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3ByaWNlX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9wcm92aWRlciI6ImF1dGgwIiwiaHR0cHM6Ly9kLWlkLmNvbS9pc19uZXciOmZhbHNlLCJodHRwczovL2QtaWQuY29tL2FwaV9rZXlfbW9kaWZpZWRfYXQiOiIyMDIzLTA1LTE2VDE4OjQyOjM1LjQ2N1oiLCJodHRwczovL2QtaWQuY29tL29yZ19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vYXBwc192aXNpdGVkIjpbIlN0dWRpbyJdLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jcmVhdGlvbl90aW1lc3RhbXAiOiIyMDIzLTA0LTAxVDIyOjU2OjAyLjgwOFoiLCJodHRwczovL2QtaWQuY29tL2FwaV9nYXRld2F5X2tleV9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vaGFzaF9rZXkiOiJxZnJGWFkxOTJRYjdyN19ZMmdsdngiLCJodHRwczovL2QtaWQuY29tL3ByaW1hcnkiOiJjdXNfT0U1SEhFSzlqZGVLbWIiLCJodHRwczovL2QtaWQuY29tL2VtYWlsIjoib3dlbkBzY2lmaWN0aW9uLmNvbSIsImlzcyI6Imh0dHBzOi8vYXV0aC5kLWlkLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDI4YjY4MjFlNjAwNmI2NTdlYWUzZjkiLCJhdWQiOlsiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTg3MjQ3NzQsImV4cCI6MTY5ODgxMTE3NCwiYXpwIjoiR3pyTkkxT3JlOUZNM0VlRFJmM20zejNUU3cwSmxSWXEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgb2ZmbGluZV9hY2Nlc3MifQ.1urQ-jAcNEz-f8Nh-comcUnRkdsWAZY3ZaRLMUjt8HukAyDU7xOShi7b1g2a-XpisiTvwuKVBQzhhi2COwN_xkaSpMrCQIKkX42vpFNKaLCMLP89zAL5QeLZosDe4A0eZ3cUJUR-jo7NCyBFTPbtS44DGPvcUo70ARTANlw-v35awa_D4B7su88jS3_8jU_0g8QM1EtdO4w-OJYi-XoEnaddeHRicC_HziAoimBiPvmtiKw8HlEpvH0dxXpXF1OC0XEXs58Vkbh4LRLJ1RzglxeLpxiABSmS99Z75qZaPvBH4FxdFWwlVxpYceBVRLnPFOlFUrJA_v3YS8mTfo3vuQ',
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
