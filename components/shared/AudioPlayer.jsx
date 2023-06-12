import { useState, useRef, useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import { FaPlay, FaPause } from 'react-icons/fa';


function AudioPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Update audio play/pause state when isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
     <Button onClick={handlePlayPause}>
      <audio ref={audioRef} src={src} />
     
        {isPlaying ? <FaPause /> : <FaPlay />}
      </Button>

  );
}

export default AudioPlayer;
