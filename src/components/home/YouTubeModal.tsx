import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Youtube } from 'lucide-react';
import { YouTubeVideo, YOUTUBE_CHANNEL } from '@/data/youtubeVideos';

interface YouTubeModalProps {
  video: YouTubeVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function YouTubeModal({ video, isOpen, onClose }: YouTubeModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock background scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen || !video) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, video, onClose]);

  if (!isOpen || !video) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="youtube-modal-title"
    >
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#071329] border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 truncate pr-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white flex-shrink-0">
              <Youtube className="w-3.5 h-3.5" />
            </span>
            <span className="truncate">{YOUTUBE_CHANNEL.name}</span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-xs text-blue-600 dark:text-cyan-400 truncate">{video.category}</span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-300/80 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close video player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 16:9 Responsive Video Iframe Container */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Modal Footer / Details */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-[#071329]">
          <div className="space-y-1 max-w-xl">
            <h3 id="youtube-modal-title" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2">
              {video.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Published: {video.publishedFormatted} • {video.viewsFormatted}
            </p>
          </div>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-all shadow-md shadow-red-600/20 flex-shrink-0"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
