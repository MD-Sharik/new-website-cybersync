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
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle video end
    const handleVideoEnd = () => {
      setIsVisible(false);
      onComplete();
    };

    // Handle video error - skip splash if video fails to load
    const handleVideoError = () => {
      console.warn('Video failed to load, skipping splash screen');
      setIsVisible(false);
      onComplete();
    };

    // Ensure minimum display time before transitioning
    const handleCanPlay = () => {
      // Set a minimum duration timer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (video.paused) {
          setIsVisible(false);
          onComplete();
        }
      }, minDuration);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('canplay', handleCanPlay);

    // Auto-play the video
    video.play().catch((err) => {
      console.warn('Video autoplay failed:', err);
      setIsVisible(false);
      onComplete();
    });

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('canplay', handleCanPlay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onComplete, minDuration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
      />
      {/* Skip button (optional) */}
      <button
        onClick={() => {
          setIsVisible(false);
          onComplete();
        }}
        className="absolute bottom-6 right-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded transition-colors backdrop-blur-sm"
      >
        Skip
      </button>
    </div>
  );
};
