import React, { useState, useRef, useEffect } from 'react';

interface VideoSplashProps {
  onComplete: () => void;
  videoSrc: string;
  minDuration?: number; // Minimum time to show splash (ms)
}

export const VideoSplash: React.FC<VideoSplashProps> = ({
  onComplete,
  videoSrc,
  minDuration = 3000, // Default 3 seconds
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);

  const handleComplete = () => {
    // Start fade animation
    setIsFading(true);
    // Remove from DOM after fade completes (500ms)
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 500);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle video end
    const handleVideoEnd = () => {
      handleComplete();
    };

    // Handle video error - skip splash if video fails to load
    const handleVideoError = () => {
      console.warn('Video failed to load, skipping splash screen');
      handleComplete();
    };

    // Ensure minimum display time before transitioning
    const handleCanPlay = () => {
      // Set a minimum duration timer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (video.paused) {
          handleComplete();
        }
      }, minDuration);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('canplay', handleCanPlay);

    // Auto-play the video
    video.play().catch((err) => {
      console.warn('Video autoplay failed:', err);
      handleComplete();
    });

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('canplay', handleCanPlay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [onComplete, minDuration]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${
      isFading ? 'opacity-0' : 'opacity-100'
    }`}>
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-contain"
        autoPlay
        muted
        playsInline
      />
      {/* Skip button (optional) */}
      {/* <button
        onClick={() => {
          handleComplete();
        }}
        className="absolute bottom-6 right-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded transition-colors backdrop-blur-sm"
      >
        Skip
      </button> */}
    </div>
  );
};
