import React from 'react';

interface BackgroundVideoProps {
  videoSrc: string;
  className?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoSrc, className = '' }) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-black/70 z-10" />
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        style={{ filter: 'brightness(0.7) blur(2px)' }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;