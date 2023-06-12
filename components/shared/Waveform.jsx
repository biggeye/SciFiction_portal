import React, { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';

const WaveSurfer = dynamic(() => import('wavesurfer.js'), { ssr: false });

const Waveform = ({ audioBlob, src }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useMemo(() => {
    if (!wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple'
      });
    }

    if (audioBlob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64AudioMessage = reader.result;
        wavesurfer.current.load(base64AudioMessage);
      };
      reader.readAsDataURL(audioBlob);
    } else if (src) {
      wavesurfer.current.load(src);
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [audioBlob, src]);

  return <div ref={waveformRef} />;
};

export default Waveform;
