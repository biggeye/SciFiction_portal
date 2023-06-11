import React, { useRef, useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { RiRecordCircleFill, RiStopCircleLine } from "react-icons/ri";

function AudioRecorder({ onRecordingComplete }) {
  const [isRecording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.start();

    setRecording(true);

    mediaRecorder.current.ondataavailable = e => {
      audioChunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/mpeg' });
      onRecordingComplete(audioBlob);

      // Reset chunks for next recording
      audioChunks.current = [];
    };
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <IconButton 
        icon={isRecording ? <RiStopCircleLine /> : <RiRecordCircleFill />} 
        onClick={isRecording ? stopRecording : startRecording}
      />
    </div>
  );
}

export default AudioRecorder;
