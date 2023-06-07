import { useEffect, useRef } from 'react';


const VideoPlayer = ({ s3Url }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      playerRef.current = videojs(videoElement, {}, function () {
        // Player is ready
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && s3Url) {
      playerRef.current.src({ src: s3Url, type: 'video/mp4' });
    }
  }, [s3Url]);

  return <video ref={videoRef} className="video-js vjs-default-skin" />;
};

export default VideoPlayer;
