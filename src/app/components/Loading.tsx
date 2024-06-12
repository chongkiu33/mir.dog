"use client";

import { useEffect, useRef } from 'react';

type LoadingProps = {
  onLoadingComplete: () => void;
};

const Loading = ({ onLoadingComplete }: LoadingProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleVideoEnd = () => {
      onLoadingComplete();
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
      videoElement.addEventListener('click', handleVideoEnd);

      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
        videoElement.removeEventListener('click', handleVideoEnd);
      };
    }
  }, [onLoadingComplete]);

  return (
    <div className="loading-container">
      <video ref={videoRef} autoPlay muted>
        <source src="/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loading;
