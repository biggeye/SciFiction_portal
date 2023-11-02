import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Box, Button, VStack, Text, Input, Checkbox } from '@chakra-ui/react';

function LiveStream() {
  const [sourceUrl, setSourceUrl] = useState(null); // Replace with your source URL
  const [offer, setOffer] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [streamIdValue, setStreamIdValue] = useState(null);
  const [iceServers, setIceServers] = useState([]);
  const [status, setStatus] = useState('Idle');
  const talkVideoRef = useRef(null);

  async function initializeStream() {
    try {
      setStatus('Initializing stream...');
      const response = await fetch('/api/did/create_stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source_url: sourceUrl }),
      });

      const data = await response.json();
      console.log(data);
      setOffer(data.offer);
      setSessionId(data.sessionId);
      setStreamIdValue(data.streamId);
      setIceServers(data.iceServers);

      const streamResponse = await fetch('/api/did/start_stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          offer: data.offer, 
          iceServers: data.iceServers, 
          streamId: data.streamId, 
          sessionId: data.sessionId 
        }),
      });

      const streamData = await streamResponse.json();
      console.log(streamData);
      setStatus('Stream initialized successfully!');
    } catch (error) {
      console.error(error);
      setStatus('Error initializing stream.');
    }
  }
  const peerConnection = useRef(null);

  useEffect(() => {
    // Initialize RTCPeerConnection
    peerConnection.current = new RTCPeerConnection({ iceServers: iceServers });

    // Handle ICE Candidate events
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        // Send the ICE candidate to the server
        (async () => {
          const { candidate, sdpMid, sdpMLineIndex } = event.candidate;
          try {
            const response = await fetch(`https://api.d-id.com/talks/streams/${streamIdValue}/ice`, {
              method: 'POST',
              headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcm9kdWN0X2lkIjoicHJvZF9MemxmZWNpR1ppWktMbSIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoicHJvIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoic3ViXzFOUmQ2bUp4RUtaMnpBeW5SejBqaVlLYiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2JpbGxpbmdfaW50ZXJ2YWwiOiJtb250aCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3BsYW5fZ3JvdXAiOiJkZWlkLXBybyIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2lkIjoicHJpY2VfMU1EbHRwSnhFS1oyekF5bkdiZ1dqWnVhIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IjgwIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9zdWJzY3JpcHRpb25faWQiOiIiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3ByaWNlX2NyZWRpdHMiOiIiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3ByaWNlX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9wcm92aWRlciI6ImF1dGgwIiwiaHR0cHM6Ly9kLWlkLmNvbS9pc19uZXciOmZhbHNlLCJodHRwczovL2QtaWQuY29tL2FwaV9rZXlfbW9kaWZpZWRfYXQiOiIyMDIzLTA1LTE2VDE4OjQyOjM1LjQ2N1oiLCJodHRwczovL2QtaWQuY29tL29yZ19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vYXBwc192aXNpdGVkIjpbIlN0dWRpbyJdLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jcmVhdGlvbl90aW1lc3RhbXAiOiIyMDIzLTA0LTAxVDIyOjU2OjAyLjgwOFoiLCJodHRwczovL2QtaWQuY29tL2FwaV9nYXRld2F5X2tleV9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vaGFzaF9rZXkiOiJxZnJGWFkxOTJRYjdyN19ZMmdsdngiLCJodHRwczovL2QtaWQuY29tL3ByaW1hcnkiOiJjdXNfT0U1SEhFSzlqZGVLbWIiLCJodHRwczovL2QtaWQuY29tL2VtYWlsIjoib3dlbkBzY2lmaWN0aW9uLmNvbSIsImlzcyI6Imh0dHBzOi8vYXV0aC5kLWlkLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDI4YjY4MjFlNjAwNmI2NTdlYWUzZjkiLCJhdWQiOlsiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTg3MjQ3NzQsImV4cCI6MTY5ODgxMTE3NCwiYXpwIjoiR3pyTkkxT3JlOUZNM0VlRFJmM20zejNUU3cwSmxSWXEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgb2ZmbGluZV9hY2Nlc3MifQ.1urQ-jAcNEz-f8Nh-comcUnRkdsWAZY3ZaRLMUjt8HukAyDU7xOShi7b1g2a-XpisiTvwuKVBQzhhi2COwN_xkaSpMrCQIKkX42vpFNKaLCMLP89zAL5QeLZosDe4A0eZ3cUJUR-jo7NCyBFTPbtS44DGPvcUo70ARTANlw-v35awa_D4B7su88jS3_8jU_0g8QM1EtdO4w-OJYi-XoEnaddeHRicC_HziAoimBiPvmtiKw8HlEpvH0dxXpXF1OC0XEXs58Vkbh4LRLJ1RzglxeLpxiABSmS99Z75qZaPvBH4FxdFWwlVxpYceBVRLnPFOlFUrJA_v3YS8mTfo3vuQ',
    
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
        })();
      }
    };
  }, [iceServers, streamIdValue, sessionId]);

  const startStream = async () => {
    try {
      // Create an SDP offer
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      // Send the offer to the server and get the answer
      const response = await fetch('/api/did/start_stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer: offer }),
      });
      const data = await response.json();

      // Set the received answer as the remote description
      const remoteAnswer = new RTCSessionDescription(data.answer);
      await peerConnection.current.setRemoteDescription(remoteAnswer);
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  const [scriptInput, setScriptInput] = useState('Hello world');
  const [fluent, setFluent] = useState(false);
  const [padAudio, setPadAudio] = useState('0.0');

  async function createTalkStream(streamIdValue, sessionId, audioOrTextDetails) {
    try {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcm9kdWN0X2lkIjoicHJvZF9MemxmZWNpR1ppWktMbSIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoicHJvIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoic3ViXzFOUmQ2bUp4RUtaMnpBeW5SejBqaVlLYiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2JpbGxpbmdfaW50ZXJ2YWwiOiJtb250aCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3BsYW5fZ3JvdXAiOiJkZWlkLXBybyIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2lkIjoicHJpY2VfMU1EbHRwSnhFS1oyekF5bkdiZ1dqWnVhIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IjgwIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9zdWJzY3JpcHRpb25faWQiOiIiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3ByaWNlX2NyZWRpdHMiOiIiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3ByaWNlX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9wcm92aWRlciI6ImF1dGgwIiwiaHR0cHM6Ly9kLWlkLmNvbS9pc19uZXciOmZhbHNlLCJodHRwczovL2QtaWQuY29tL2FwaV9rZXlfbW9kaWZpZWRfYXQiOiIyMDIzLTA1LTE2VDE4OjQyOjM1LjQ2N1oiLCJodHRwczovL2QtaWQuY29tL29yZ19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vYXBwc192aXNpdGVkIjpbIlN0dWRpbyJdLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jcmVhdGlvbl90aW1lc3RhbXAiOiIyMDIzLTA0LTAxVDIyOjU2OjAyLjgwOFoiLCJodHRwczovL2QtaWQuY29tL2FwaV9nYXRld2F5X2tleV9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vaGFzaF9rZXkiOiJxZnJGWFkxOTJRYjdyN19ZMmdsdngiLCJodHRwczovL2QtaWQuY29tL3ByaW1hcnkiOiJjdXNfT0U1SEhFSzlqZGVLbWIiLCJodHRwczovL2QtaWQuY29tL2VtYWlsIjoib3dlbkBzY2lmaWN0aW9uLmNvbSIsImlzcyI6Imh0dHBzOi8vYXV0aC5kLWlkLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDI4YjY4MjFlNjAwNmI2NTdlYWUzZjkiLCJhdWQiOlsiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTg3MjQ3NzQsImV4cCI6MTY5ODgxMTE3NCwiYXpwIjoiR3pyTkkxT3JlOUZNM0VlRFJmM20zejNUU3cwSmxSWXEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgb2ZmbGluZV9hY2Nlc3MifQ.1urQ-jAcNEz-f8Nh-comcUnRkdsWAZY3ZaRLMUjt8HukAyDU7xOShi7b1g2a-XpisiTvwuKVBQzhhi2COwN_xkaSpMrCQIKkX42vpFNKaLCMLP89zAL5QeLZosDe4A0eZ3cUJUR-jo7NCyBFTPbtS44DGPvcUo70ARTANlw-v35awa_D4B7su88jS3_8jU_0g8QM1EtdO4w-OJYi-XoEnaddeHRicC_HziAoimBiPvmtiKw8HlEpvH0dxXpXF1OC0XEXs58Vkbh4LRLJ1RzglxeLpxiABSmS99Z75qZaPvBH4FxdFWwlVxpYceBVRLnPFOlFUrJA_v3YS8mTfo3vuQ',
            },
        body: JSON.stringify({
          script: {
            type: 'text',
            subtitles: 'false',
            provider: { type: 'elevenlabs', voice_id: '21m00Tcm4TlvDq8ikWAM' },
            ssml: 'false',
            input: scriptInput,
          },
          config: { fluent: fluent.toString(), pad_audio: padAudio },
          session_id: sessionId,
        }),
      };

      const response = await fetch(`https://api.d-id.com/talks/streams/${streamIdValue}`, options);
      const data = await response.json();
      console.log(data);
      setStatus('Talk stream created successfully!');
    } catch (error) {
      console.error(error);
      setStatus('Error creating talk stream.');
    }
  }

  const handleTalkClick = useCallback(async () => {
    if (!streamIdValue || !sessionId) {
      console.error("Stream ID or Session ID is missing");
      return;
    }

    const audioOrTextDetails = {
      // Fill this with the necessary details for the avatar to speak
      // For example:
      text: "Hello, this is the avatar speaking!"
    };

    await createTalkStream(streamIdValue, sessionId, audioOrTextDetails);
  }, [streamIdValue, sessionId]);

  return (
    <VStack spacing={4}>
    <Input
      placeholder="Enter source URL"
      value={sourceUrl || ''}
      onChange={(e) => setSourceUrl(e.target.value)}
    />
    <Input
      placeholder="Enter script input"
      value={scriptInput}
      onChange={(e) => setScriptInput(e.target.value)}
    />
    <Checkbox isChecked={fluent} onChange={(e) => setFluent(e.target.checked)}>
      Fluent
    </Checkbox>
    <Input
      placeholder="Enter pad audio value"
      value={padAudio}
      onChange={(e) => setPadAudio(e.target.value)}
    />
    <Button onClick={initializeStream}>Start Stream</Button>
    <Button onClick={handleTalkClick}>Talk</Button>
    <Text>{status}</Text>
    <Box id="video-wrapper">
      <video ref={talkVideoRef} width="400" height="400" autoPlay></video>
    </Box>
  </VStack>
);
}

export default LiveStream;
