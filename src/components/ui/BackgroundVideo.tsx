import React, { useEffect, useRef } from 'react';

interface BackgroundVideoProps {
  videoSrc: string;
  className?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoSrc, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadVideo = async () => {
      try {
        // Preload the video
        video.load();
        // Start playing when loaded
        await video.play();
      } catch (error) {
        console.error('Video playback error:', error);
      }
    };

    loadVideo();

    // Handle visibility change to optimize performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(e => console.error('Video play error:', e));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [videoSrc]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;