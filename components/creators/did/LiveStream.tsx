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
          authorization: 'Bearer YOUR_BEARER_TOKEN', // Replace with your token
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