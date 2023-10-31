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
import { useSelector, useDispatch } from 'react-redux';
import { selectImages } from '../../../utils/redux/gallerySlice';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function LiveStream() {
  const supabase = useSupabaseClient();
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

//  const gallery = useSelector(selectImages);
  const galleryImages = useSelector(selectImages);
  const [streaming_avatar, setStreamingAvatar] = useState("");

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
        `https://api.d-id.com/talks/streams`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_url: { streaming_avatar },
          }),
        }
      );

      const {
        id: newStreamId,
        offer,
        ice_servers: iceServers,
        session_id: newSessionId,
      } = await sessionResponse.json();
      streamId = newStreamId;
      sessionId = newSessionId;

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
        peerConnection?.signalingState === "stable" ||
        peerConnection?.iceConnectionState === "connected"
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
    iceStatusLabel.innerText = peerConnection.iceConnectionState;
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
    // not supported in firefox
    peerStatusLabel.innerText = peerConnection.connectionState;
    peerStatusLabel.className =
      "peerConnectionState-" + peerConnection.connectionState;
  }
  function onSignalingStateChange() {
    signalingStatusLabel.innerText = peerConnection.signalingState;
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
      const stats = await peerConnection.getStats(event.track);
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
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection({ iceServers });
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

    await peerConnection.setRemoteDescription(offer);
    console.log("set remote sdp OK");

    const sessionClientAnswer = await peerConnection.createAnswer();
    console.log("create local sdp OK");

    await peerConnection.setLocalDescription(sessionClientAnswer);
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

  console.log(galleryImages);

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

      <SimpleGrid columns={3} spacing={4}>
      {galleryImages.map((image, index) => (
              <Box
                key={index}
                border={streaming_avatar === image.url ? "2px solid blue" : "none"}
                onClick={() => setStreamingAvatar(image.url)}
                p={2}
              >
                <Image src={image.url} alt="Gallery Image" />
              </Box>
            ))}
      </SimpleGrid>
    </Box>
  );
}
