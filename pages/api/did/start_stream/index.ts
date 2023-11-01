import type { NextApiRequest, NextApiResponse } from 'next';

let peerConnection: RTCPeerConnection | null = null;

async function onIceCandidate(event: RTCPeerConnectionIceEvent, streamId: string, sessionId: string) {
  console.log("Handling ICE candidate event...");
  if (event.candidate) {
    const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

    try {
      const response = await fetch(`https://api.d-id.com/talks/streams/${streamId}/ice`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate,
          sdpMid,
          sdpMLineIndex,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        console.error('Failed to send ICE candidate:', await response.text());
      }
    } catch (error) {
      console.error('Error sending ICE candidate:', error);
    }
  }
}

async function createPeerConnection(offer: RTCSessionDescriptionInit, iceServers: RTCIceServer[], streamId: string, sessionId: string): Promise<RTCSessionDescriptionInit> {
  console.log("Creating new peer connection...");
  const localPeerConnection = new RTCPeerConnection({ iceServers });
  
  // Add the onIceCandidate event listener
  localPeerConnection.onicecandidate = (event) => onIceCandidate(event, streamId, sessionId);

  localPeerConnection.oniceconnectionstatechange = () => {
      if (localPeerConnection.iceConnectionState === 'connected' || localPeerConnection.iceConnectionState === 'completed') {
          console.log('WebRTC connection established and ready!');
      }
  };
  
  console.log("Setting remote description for peer connection...");
  await localPeerConnection.setRemoteDescription(offer);
  
  console.log("Creating session client answer...");
  const sessionClientAnswer = await localPeerConnection.createAnswer();
  await localPeerConnection.setLocalDescription(sessionClientAnswer);
  
  return sessionClientAnswer;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { offer, iceServers, streamId, sessionId } = req.body;
    console.log("Received request to start stream with parameters:", { offer, iceServers, streamId, sessionId });
    
    const sessionClientAnswer = await createPeerConnection(offer, iceServers, streamId, sessionId);

    console.log("Sending SDP answer to external API...");
    const sdpResponse = await fetch(`https://api.d-id.com/talks/streams/${streamId}/sdp`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: sessionClientAnswer,
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
