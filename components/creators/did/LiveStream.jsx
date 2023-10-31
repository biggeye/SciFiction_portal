import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Select,
  SimpleGrid,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

let streamId;
let sessionId;


export default function LiveStream() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localRTCPeerConnection, setLocalRTCPeerConnection] = useState(null); // Renamed
  const [iceServers, setIceServers] = useState([]);
  const peerConnectionRef = useRef(null);
  const talkVideoRef = useRef(null);
  const peerStatusLabelRef = useRef(null);
  const iceStatusLabelRef = useRef(null);
  const connectButtonRef = useRef(null);
  const talkButtonRef = useRef(null);
  const destroyButtonRef = useRef(null);
  const iceGatheringStatusLabelRef = useRef(null);
  const signalingStatusLabelRef = useRef(null);
  const streamingStatusLabelRef = useRef(null);
  let statsIntervalId;

  useEffect(() => {
    if (talkVideoRef.current) {
      talkVideoRef.current.setAttribute("playsinline", true);
    }
    const RTCConnection =
      window.RTCPeerConnection ||
      window.webkitRTCPeerConnection ||
      window.mozRTCPeerConnection;

    if (!peerConnectionRef.current) {
      peerConnectionRef.current = new RTCConnection({ iceServers });
    }

    // Attach event handlers using refs
    connectButtonRef.current.onclick = async () => {
      if (
        peerConnectionRef.current &&
        peerConnectionRef.current.connectionState === "connected"
      ) {
        return;
      }

      stopAllStreams();
      closePC();

      const sessionResponse = await fetchWithRetries(
        `https://api.d-id.com/talks/streams`)
        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcm9kdWN0X2lkIjoicHJvZF9MemxmZWNpR1ppWktMbSIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoicHJvIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoic3ViXzFOUmQ2bUp4RUtaMnpBeW5SejBqaVlLYiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2JpbGxpbmdfaW50ZXJ2YWwiOiJtb250aCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3BsYW5fZ3JvdXAiOiJkZWlkLXBybyIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2lkIjoicHJpY2VfMU1EbHRwSnhFS1oyekF5bkdiZ1dqWnVhIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IjgwIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9zdWJzY3JpcHRpb25faWQiOiIiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3ByaWNlX2NyZWRpdHMiOiIiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3ByaWNlX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9wcm92aWRlciI6ImF1dGgwIiwiaHR0cHM6Ly9kLWlkLmNvbS9pc19uZXciOmZhbHNlLCJodHRwczovL2QtaWQuY29tL2FwaV9rZXlfbW9kaWZpZWRfYXQiOiIyMDIzLTA1LTE2VDE4OjQyOjM1LjQ2N1oiLCJodHRwczovL2QtaWQuY29tL29yZ19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vYXBwc192aXNpdGVkIjpbIlN0dWRpbyJdLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jcmVhdGlvbl90aW1lc3RhbXAiOiIyMDIzLTA0LTAxVDIyOjU2OjAyLjgwOFoiLCJodHRwczovL2QtaWQuY29tL2FwaV9nYXRld2F5X2tleV9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vaGFzaF9rZXkiOiJxZnJGWFkxOTJRYjdyN19ZMmdsdngiLCJodHRwczovL2QtaWQuY29tL3ByaW1hcnkiOiJjdXNfT0U1SEhFSzlqZGVLbWIiLCJodHRwczovL2QtaWQuY29tL2VtYWlsIjoib3dlbkBzY2lmaWN0aW9uLmNvbSIsImlzcyI6Imh0dHBzOi8vYXV0aC5kLWlkLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDI4YjY4MjFlNjAwNmI2NTdlYWUzZjkiLCJhdWQiOlsiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTg3MjQ3NzQsImV4cCI6MTY5ODgxMTE3NCwiYXpwIjoiR3pyTkkxT3JlOUZNM0VlRFJmM20zejNUU3cwSmxSWXEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgb2ZmbGluZV9hY2Nlc3MifQ.1urQ-jAcNEz-f8Nh-comcUnRkdsWAZY3ZaRLMUjt8HukAyDU7xOShi7b1g2a-XpisiTvwuKVBQzhhi2COwN_xkaSpMrCQIKkX42vpFNKaLCMLP89zAL5QeLZosDe4A0eZ3cUJUR-jo7NCyBFTPbtS44DGPvcUo70ARTANlw-v35awa_D4B7su88jS3_8jU_0g8QM1EtdO4w-OJYi-XoEnaddeHRicC_HziAoimBiPvmtiKw8HlEpvH0dxXpXF1OC0XEXs58Vkbh4LRLJ1RzglxeLpxiABSmS99Z75qZaPvBH4FxdFWwlVxpYceBVRLnPFOlFUrJA_v3YS8mTfo3vuQ'
          },
          body: JSON.stringify({
            source_url: 'https://xqdkoozsrecjixhnpoou.supabase.co/storage/v1/object/public/production_avatars/e4de12e7-14b1-43dc-9e39-fa71b3a34db2.png'
          })
        };
        
        fetch('https://api.d-id.com/talks/streams', options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
      
      const {
        id: streamId,
        offer,
        ice_servers: iceServers,
        session_id: sessionId,
      } = await sessionResponse.json();

      try {
        sessionClientAnswer = await createPeerConnection(offer, iceServers);
      } catch (e) {
        console.log("error during streaming setup", e);
        stopAllStreams();
        closePC();
        return;
      }

      const sdpResponse = await fetch(
        `https://api.d-id.com/talks/streams/${streamId}/sdp`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${DID_API.key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer: sessionClientAnswer,
            session_id: sessionId,
          }),
        }
      );
    };

    talkButtonRef.current.onclick = async () => {
      // connectionState not supported in firefox
      if (
        peerConnectionRef.current?.signalingState === "stable" ||
        peerConnectionRef.current?.iceConnectionState === "connected"
      ) {
        const talkResponse = await fetchWithRetries(
          `https://api.d-id.com/talks/streams/${streamId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              script: {
                type: "audio",
                audio_url:
                  "https://d-id-public-bucket.s3.us-west-2.amazonaws.com/webrtc.mp3",
              },
              driver_url: "bank://lively/",
              config: {
                stitch: true,
              },
              session_id: sessionId,
            }),
          }
        );
      }
    };

    destroyButtonRef.current.onclick = async () => {
      await fetch(
        `https://api.d-id.com/talks/streams/talks/streams/${streamId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${DID_API.key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: sessionId }),
        }
      );

      stopAllStreams();
      closePC();
    };
  }, []);

  function onIceGatheringStateChange() {
    iceGatheringStatusLabelRef.current.innerText =
    peerConnectionRef.current.iceGatheringState;
    iceGatheringStatusLabelRef.current.className =
      "iceGatheringState-" + peerConnectionRef.current.iceGatheringState;
  }
  function onIceCandidate(event) {
    console.log("onIceCandidate", event);
    if (event.candidate) {
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

      fetch(
        `https://api.d-id.com/talks/streams/talks/streams/${streamId}/ice`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${DID_API.key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidate,
            sdpMid,
            sdpMLineIndex,
            session_id: sessionId,
          }),
        }
      );
    }
  }
  function onIceConnectionStateChange() {
    iceStatusLabel.innerText = peerConnectionRef.current.iceConnectionState;
 
    iceStatusLabel.className =
      "iceConnectionState-" + peerConnection.iceConnectionState;
    if (
      peerConnection.iceConnectionState === "failed" ||
      peerConnection.iceConnectionState === "closed"
    ) {
      stopAllStreams();
      closePC();
    }
  }
  function onConnectionStateChange() {
    peerStatusLabel.innerText = peerConnectionRef.current.connectionState;
    peerStatusLabel.className =
      "peerConnectionState-" + peerConnection.connectionState;
  }
  function onSignalingStateChange() {
    signalingStatusLabel.innerText = peerConnectionRef.current.signalingState;
    signalingStatusLabel.className =
      "signalingState-" + peerConnection.signalingState;
  }

  function onVideoStatusChange(videoIsPlaying, stream) {
    let status;
    if (videoIsPlaying) {
      status = "streaming";
      const remoteStream = stream;
      setVideoElement(remoteStream);
    } else {
      status = "empty";
      playIdleVideo();
    }
    streamingStatusLabel.innerText = status;
    streamingStatusLabel.className = "streamingState-" + status;
  }

  function onTrack(event) {
    /**
     * The following code is designed to provide information about wether currently there is data
     * that's being streamed - It does so by periodically looking for changes in total stream data size
     *
     * This information in our case is used in order to show idle video while no talk is streaming.
     * To create this idle video use the POST https://api.d-id.com/talks endpoint with a silent audio file or a text script with only ssml breaks
     * https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#break-tag
     * for seamless results use `config.fluent: true` and provide the same configuration as the streaming video
     */

    if (!event.track) return;

    statsIntervalId = setInterval(async () => {
      const stats = await peerConnectionRef.current.getStats(event.track);
       stats.forEach((report) => {
        if (report.type === "inbound-rtp" && report.mediaType === "video") {
          const videoStatusChanged =
            videoIsPlaying !== report.bytesReceived > lastBytesReceived;

          if (videoStatusChanged) {
            videoIsPlaying = report.bytesReceived > lastBytesReceived;
            onVideoStatusChange(videoIsPlaying, event.streams[0]);
          }
          lastBytesReceived = report.bytesReceived;
        }
      });
    }, 500);
  }

  async function createPeerConnection(offer, iceServers) {
    if (!peerConnectionRef.current) {
        peerConnectionRef.current = new RTCPeerConnection({ iceServers });
      peerConnection.addEventListener(
        "icegatheringstatechange",
        onIceGatheringStateChange,
        true
      );
      peerConnection.addEventListener("icecandidate", onIceCandidate, true);
      peerConnection.addEventListener(
        "iceconnectionstatechange",
        onIceConnectionStateChange,
        true
      );
      peerConnection.addEventListener(
        "connectionstatechange",
        onConnectionStateChange,
        true
      );
      peerConnection.addEventListener(
        "signalingstatechange",
        onSignalingStateChange,
        true
      );
      peerConnection.addEventListener("track", onTrack, true);
    }

    await peerConnectionRef.current.setRemoteDescription(offer);
    console.log("set remote sdp OK");

    const sessionClientAnswer = await peerConnectionRef.current.createAnswer();
    console.log("create local sdp OK");

    await peerConnectionRef.current.setLocalDescription(sessionClientAnswer);
    console.log("set local sdp OK");

    return sessionClientAnswer;
  }

  function setVideoElement(stream) {
    if (!stream) return;
    talkVideoRef.current.srcObject = stream;
    talkVideoRef.current.loop = false;

    // safari hotfix
    if (talkVideoRef.current.paused) {
      talkVideoRef.current
        .play()
        .then((_) => {})
        .catch((e) => {});
    }
  }

  function playIdleVideo() {
    talkVideoRef.current.srcObject = undefined;
    talkVideoRef.current.src = "or_idle.mp4";
    talkVideoRef.current.loop = true;
  }

  function stopAllStreams() {
    if (talkVideoRef.current.srcObject) {
      console.log("stopping video streams");
      talkVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
      talkVideoRef.current.srcObject = null;
    }
  }

  function closePC(pc = peerConnectionRef.current) {
    if (!pc) return;
    console.log("stopping peer connection");
    pc.close();
    pc.removeEventListener(
      "icegatheringstatechange",
      onIceGatheringStateChange,
      true
    );
    pc.removeEventListener("icecandidate", onIceCandidate, true);
    pc.removeEventListener(
      "iceconnectionstatechange",
      onIceConnectionStateChange,
      true
    );
    pc.removeEventListener(
      "connectionstatechange",
      onConnectionStateChange,
      true
    );
    pc.removeEventListener(
      "signalingstatechange",
      onSignalingStateChange,
      true
    );
    pc.removeEventListener("track", onTrack, true);
    clearInterval(statsIntervalId);
    iceGatheringStatusLabelRef.current.innerText = "";
    signalingStatusLabelRef.current.innerText = "";
    iceStatusLabelRef.current.innerText = "";
    peerStatusLabelRef.current.innerText = "";
    console.log("stopped peer connection");
    if (pc === peerConnectionRef.current) {
      peerConnectionRef.current = null;
    }
  }

  const maxRetryCount = 3;
  const maxDelaySec = 4;

  async function fetchWithRetries(url, options, retries = 1) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (retries <= maxRetryCount) {
        const delay =
          Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) *
          1000;

        await new Promise((resolve) => setTimeout(resolve, delay));

        console.log(
          `Request failed, retrying ${retries}/${maxRetryCount}. Error ${err}`
        );
        return fetchWithRetries(url, options, retries + 1);
      } else {
        throw new Error(`Max retries exceeded. error: ${err}`);
      }
    }
  }



  return (
    <Box>
      <Box id="video-wrapper">
        <video ref={talkVideoRef} width="400" height="400" autoPlay></video>
      </Box>

      <VStack spacing={4} marginTop={4}>
        <Button ref={connectButtonRef}>Connect</Button>
        <Button ref={talkButtonRef}>Start</Button>
        <Button ref={destroyButtonRef}>Destroy</Button>
      </VStack>

      <VStack align="start" spacing={2} marginTop={4}>
        <Text>
          ICE gathering status: <span ref={iceGatheringStatusLabelRef}></span>
        </Text>
        <Text>
          ICE status: <span ref={iceStatusLabelRef}></span>
        </Text>
        <Text>
          Peer connection status: <span ref={peerStatusLabelRef}></span>
        </Text>
        <Text>
          Signaling status: <span ref={signalingStatusLabelRef}></span>
        </Text>
        <Text>
          Streaming status: <span ref={streamingStatusLabelRef}></span>
        </Text>
      </VStack>

    </Box>
  );
}
