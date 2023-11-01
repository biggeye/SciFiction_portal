import React, { useState, useRef, useCallback } from 'react';
import { Box, Button, VStack, Text, Input } from '@chakra-ui/react';

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

  async function createTalkStream(streamId, sessionId, details) {
    try {
      const response = await fetch(`https://api.d-id.com/api/d-id/talks/streams/${streamId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          ...details,
          session_id: sessionId
        }),
      });

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
