

/*. example response
{
  "id": "your_stream_id",
  "session_id": "your_session_id",
  "offer": "your_sdp_offer",
  "ice_servers": [
    {
      "urls": ["stun:stun.example.com"]
    }
  ]
}
##
Step 2: Starting the stream

After receiving the SDP offer from the server in Step 1, you need to generate the SDP answer and send it back. To obtain the SDP answer, you can use WebRTC APIs or libraries that provide the necessary functionality. Here is a general outline of the steps involved:

Create a WebRTC peer connection object in your application.
Set the received SDP offer as the remote description of the peer connection using the setRemoteDescription() method.
Generate the SDP answer by calling the createAnswer() method on the peer connection.
Set the generated SDP answer as the local description of the peer connection using the setLocalDescription() method.
Once you have obtained the SDP answer as a string, you can send it back to the server using the /streams/{session_id}/sdp endpoint.

Here’s an example of the answer creation code, taken from this example repository:
*/

async function createPeerConnection(offer, iceServers) {
  if (!peerConnection) {
    peerConnection = new RTCPeerConnection({ iceServers });
// Here we add event listeners for any events we want to handle
    peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
    peerConnection.addEventListener('icecandidate', onIceCandidate, true);
    peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
    peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
    peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
    peerConnection.addEventListener('track', onTrack, true);
  }

  await peerConnection.setRemoteDescription(offer);
  const sessionClientAnswer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(sessionClientAnswer);

  return sessionClientAnswer;
}
const sdpResponse = await fetch(`https://api.d-id.com/talks/streams/${streamId}/sdp`, {
    method: 'POST',
    headers: {
      Authorization: `Basic {YOUR_DID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answer: sessionClientAnswer,
      session_id: sessionId,
    }),
  });


/*Once the SDP answer is sent, you must gather ICE candidates and send them to the server to complete the WebRTC handshake. ICE candidates allow the peers to discover and establish an optimal network path for communication.

Listen for the icecandidate event on your peer connection object and send each ICE candidate to the server using the /streams/{stream_id}/ice endpoint. Replace {stream_id} with the appropriate stream ID obtained in Step 1. From the ice candidates you receive, you should only send the candidate, sdpMid, and sdpMLineIndex attributes.

Here’s an example of the icecandidate event handler from our streaming demo repository:
*/

function onIceCandidate(event) {
  if (event.candidate) {
    const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

    fetch(`https://api.d-id.com/talks/streams/${streamId}/ice`, {
      method: 'POST',
      headers: {
        Authorization: `Basic {YOUR_DID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        candidate,
        sdpMid,
        sdpMLineIndex,
        session_id: sessionId,
      }),
    });
  }
}

/*
Waiting for Connection Readiness:

After sending the SDP answer and the ICE candidates, you need to wait for the WebRTC connection to become ready. Listen for the iceconnectionstatechange event on your peer connection object and check for the iceConnectionState property. When the connection state changes to connected or completed, the connection is ready to proceed. This event listener is one of those we used in Step 2, specifically, onIceConnectionStateChange


✅ Step 4: Create a talk stream

With the connection established, you can now create a talk. Make a POST request to /talks/streams/{stream_id} endpoint to request a video to be created and streamed over the established connection. Remember to include the session ID in the request body. In this request you can send the details of the audio or text for the avatar to speak, along with additional configuration options that allow for greater flexibility and customization.


✅ Step 5: Closing the stream

To close the video streaming session, make a DELETE request to /talks/streams/{stream_id} endpoint. This will close the connection and end the session. If no messages are sent within the session for 5 minutes, the session will be automatically terminated.

*/
