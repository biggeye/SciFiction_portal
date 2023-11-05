/*
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Badge, Box, Button, VStack, Text, Input, Checkbox } from '@chakra-ui/react';

function LiveStream() {
  const [sourceUrl, setSourceUrl] = useState(null); // Replace with your source URL
  const [offer, setOffer] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [streamIdValue, setStreamIdValue] = useState(null);
  const [iceServers, setIceServers] = useState([]);
  const [status, setStatus] = useState('Idle');
  const talkVideoRef = useRef(null);

  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [iceStatus, setIceStatus] = useState('idle');
  const [signalingStatus, setSignalingStatus] = useState('idle');
  const [streamingStatus, setStreamingStatus] = useState('idle');

  async function initializeStream() {
    try {
      setConnectionStatus('inProgress'); // Set status to inProgress when initialization starts
      setStatus('Initializing stream...');
      const response = await fetch('/api/did/create_stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source_url: sourceUrl }),
      });

      const data = await response.json();
      console.log('initializeStream:', data);
      setStreamIdValue(data.id);
      setIceServers(data.ice_servers);
      setSessionId(data.session_id);
      const sdpAnswer = {
        type: 'answer', // This should be 'answer' since you are sending an answer
        sdp: data.offer.sdp, // Assuming this contains the correct SDP answer string
      };
      // Use the state variables that have just been set
      // Use data.id and data.session_id directly from the response
      const streamResponse = await fetch('/api/did/start_stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          session_id: data.session_id,
          answer: sdpAnswer,
        }),
      });


      const streamData = await streamResponse.json();
      console.log('streamResponse: ', streamData);
      setStatus('Stream initialized successfully!');
      setConnectionStatus('active'); // Set status to active once stream is initialized
    } catch (error) {
      console.error(error);
      setStatus('Error initializing stream.');
      setConnectionStatus('error'); // Set status to error if initialization fails
    }
  }

  const peerConnection = useRef(null);

  useEffect(() => {
    // Initialize RTCPeerConnection
    console.log('peerConnection (iceServers): ', iceServers);
    peerConnection.current = new RTCPeerConnection({ iceServers: iceServers });

    // Handle ICE Candidate events
    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        // Update ICE status when ICE candidate is found
        setIceStatus('inProgress');
         console.log('ICE Candidate events', peerConnection);
        const { candidate, sdpMid, sdpMLineIndex } = event.candidate;
        try {
          const response = await fetch(`https://api.d-id.com/talks/streams/${streamIdValue}/ice`, {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Basic YjNkbGJrQnpZMmxtYVdOMGFXOXVMbU52YlE6MDFPVkE1emdGWFhfOXdmSkhVZTJ5'
            },
            body: JSON.stringify({
              candidate,
              sdpMid,
              sdpMLineIndex,
              session_id: sessionId,
            }),
          });

          if (response.ok) {
            console.log('response ok', response);
            // Update ICE status to reflect that the candidate was successfully sent
            setIceStatus('sent');
          } else {
            // Update ICE status to reflect an error in sending the candidate
            setIceStatus('error');
            console.error('Failed to send ICE candidate:', await response.text());
          }
        } catch (error) {
          // Update ICE status to reflect an error in sending the candidate
          setIceStatus('error');
          console.error('Error sending ICE candidate:', error);
        }
      } else {
        // When there are no more candidates, the ICE gathering state is complete
        setIceStatus('complete');
      }
    };

    peerConnection.current.ontrack = (event) => {
      console.log('ontrack event received:', event);
      if (event.streams && event.streams[0]) {
        console.log('Stream received with tracks:', event.streams[0].getTracks());
        talkVideoRef.current.srcObject = event.streams[0];
        setStreamingStatus('active'); // Update streaming status when the track is received
      }
    };


  }, [iceServers, streamIdValue, sessionId]);


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
          authorization: 'Basic YjNkbGJrQnpZMmxtYVdOMGFXOXVMbU52YlE6MDFPVkE1emdGWFhfOXdmSkhVZTJ5'
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
      console.log('createTalkStream', data);
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

  // Function to update status with color coding
  const renderStatusBadge = (status) => {
    let color = 'gray';
    if (status === 'active') color = 'green';
    if (status === 'error') color = 'red';
    if (status === 'inProgress') color = 'yellow';

    return <Badge colorScheme={color}>{status.toUpperCase()}</Badge>;
  };

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
      <Button onClick={initializeStream}>Start Stream</Button>
      <Button onClick={handleTalkClick}>Talk</Button>
      <Text>{status}</Text>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Text>Connection Status:</Text>
        {renderStatusBadge(connectionStatus)}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Text>ICE Gathering Status:</Text>
        {renderStatusBadge(iceStatus)}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Text>Signaling Status:</Text>
        {renderStatusBadge(signalingStatus)}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Text>Streaming Status:</Text>
        {renderStatusBadge(streamingStatus)}
      </Box>

      {/* Video Element */}
/*
      <Box id="video-wrapper">
        <video ref={talkVideoRef} width="400" height="400" autoPlay playsInline></video>
      </Box>
      <Box id="video-wrapper">
        <video ref={talkVideoRef} width="400" height="400" autoPlay playsInline></video>

      </Box>
    </VStack>
  );
}

export default LiveStream;
*/
