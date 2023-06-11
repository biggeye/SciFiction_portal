import React, { useEffect, useRef } from 'react';   
import dynamic from 'next/dynamic';

const WaveSurfer = dynamic(() => import('wavesurfer.js'), { ssr: false });

// Then, use `WaveSurfer` in your component. It will only be imported in the browser.

const Waveform = ({ audioBlob }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple'
    });

    if (audioBlob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64AudioMessage = reader.result;
        wavesurfer.current.load(base64AudioMessage);
      };
      reader.readAsDataURL(audioBlob);
    }

    // Clean up function
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [audioBlob]);

  return <div ref={waveformRef} />;
};

export default Waveform;
