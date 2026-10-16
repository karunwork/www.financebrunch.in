import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Youtube, ExternalLink, ChevronLeft, ChevronRight, 
  Eye, Calendar, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/ui/animation';
import { youtubeVideos, YouTubeVideo, YOUTUBE_CHANNEL } from '@/data/youtubeVideos';
import { fetchLiveYouTubeVideos } from '@/services/api';
import { YouTubeModal } from './YouTubeModal';

export default function YouTubeShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const [videos, setVideos] = useState<YouTubeVideo[]>(youtubeVideos);
  const [lastUpdated, setLastUpdated] = useState<string | undefined>();

  const maxIndex = videos.length - 1;
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchLiveYouTubeVideos().then((result) => {
      if (!mounted || result.videos.length === 0) return;
      setVideos(result.videos);
      setLastUpdated(result.lastUpdated);
      setCurrentIndex(0);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Helper to restart the 6-second timer on user interaction
  const resetAutoplay = () => {
    setAutoplayKey((k) => k + 1);
  };

  // Auto-advance every 6s unless hovered or modal is open
  useEffect(() => {
    // Respect reduced-motion preferences where practical
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (isModalOpen || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [maxIndex, isModalOpen, isHovered, autoplayKey]);

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
  };

  const handlePlayVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section 
      id="insights-youtube"
      className="py-24 bg-transparent overflow-hidden relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Insights From The Finance Brunch YouTube Section"
    >
      {/* Translucent FB Watermark in the background */}
      <div 
        aria-hidden="true" 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.035] dark:opacity-[0.045]"
      >
        <img 
          src="/images/fb-watermark.png" 
          alt="" 
          className="w-[360px] sm:w-[480px] md:w-[620px] h-auto object-contain filter contrast-105" 
          loading="lazy"
        />
      </div>

      {/* Ambient Lighting Blooms */}
      <div 
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[130px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        
        {/* Section Header */}
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Official YouTube Channel
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Insights From <span className="text-primary">The Finance Brunch</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore financial insights, investment education, market perspectives, and practical guidance from our YouTube channel.
          </p>
          {lastUpdated && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              Latest channel data checked {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(lastUpdated))}
            </p>
          )}
        </FadeIn>

        {/* Carousel Container - Restored & Significantly Enlarged */}
        <FadeIn 
          direction="up" 
          delay={0.15} 
          className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-12 md:px-14 lg:px-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Clipped Carousel Viewport - Exactly min(1100px, calc(100vw - 100px)) on desktop */}
          <div 
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl mx-auto w-full max-w-[calc(100%-32px)] sm:max-w-full lg:max-w-[min(1100px,calc(100vw-100px))]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {videos.map((video) => (
                <div key={video.id} className="w-full flex-shrink-0 px-1 sm:px-2">
                  <div
                    onClick={() => handlePlayVideo(video)}
                    className="group bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl p-[20px] sm:p-6 lg:p-[32px] border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all duration-300 cursor-pointer w-full flex flex-col justify-center min-h-0 md:min-h-[380px]"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-[28px] w-full">
                      
                      {/* Left: Large & Clear Video Thumbnail Area (~420px width on desktop, 16/9 aspect ratio) */}
                      <div className="w-full md:w-[420px] flex-shrink-0">
                        <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 shadow-md">
                          <img 
                            src={video.maxResThumbnail}
                            alt={video.title}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = video.thumbnail;
                            }}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />

                          {/* Vignette Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <span className={cn(
                              "px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase border backdrop-blur-md",
                              video.tagColor.bg,
                              video.tagColor.text,
                              video.tagColor.border
                            )}>
                              {video.category}
                            </span>

                            <span className="backdrop-blur-md bg-black/60 text-white/90 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                              <Eye className="w-2.5 h-2.5 text-red-400" />
                              <span>{video.viewsFormatted}</span>
                            </span>
                          </div>

                          {/* Centered Prominent Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:scale-115 group-hover:bg-red-500 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.55)]">
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5 fill-white" />
                            </div>
                          </div>

                          {/* Bottom Banner */}
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/85 font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-300" />
                              {video.publishedFormatted}
                            </span>
                            <span className="font-semibold text-red-300 group-hover:text-white transition-colors">
                              Click to Play ➔
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Video Details & Information (Vertically Centered) */}
                      <div className="flex-1 flex flex-col justify-center min-w-0 py-1 space-y-3 sm:space-y-4">
                        <div>
                          {/* Eyebrow Badge */}
                          <div className="inline-block mb-1.5 sm:mb-2">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-xs font-semibold tracking-wide border",
                              video.tagColor.bg,
                              video.tagColor.text,
                              video.tagColor.border
                            )}>
                              {video.category}
                            </span>
                          </div>

                          {/* Video Title */}
                          <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                            {video.title}
                          </h3>

                          {/* Video Short Description */}
                          <p className="mt-2.5 text-sm sm:text-base lg:text-[15px] text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                            {video.description}
                          </p>
                        </div>

                        {/* Bottom Row: Channel branding & Watch action */}
                        <div className="pt-3.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs sm:text-sm">
                          <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-400">
                            <Youtube className="w-4 h-4 text-red-600" />
                            <span>The Finance Brunch</span>
                          </span>
                          <span className="font-semibold text-primary flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                            <span>Watch Video</span>
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button - Positioned outside card edges */}
          <div className="absolute top-1/2 left-0 sm:left-1 md:left-2 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-900 hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary"
              onClick={goToPrev}
              aria-label="Previous video"
            >
              <ChevronLeft size={22} className="transition-transform duration-200 hover:-translate-x-0.5" />
            </Button>
          </div>

          {/* Right Arrow Button - Positioned outside card edges */}
          <div className="absolute top-1/2 right-0 sm:right-1 md:right-2 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-900 hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary"
              onClick={goToNext}
              aria-label="Next video"
            >
              <ChevronRight size={22} className="transition-transform duration-200 hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Pagination Indicators Below Card */}
          <div className="flex justify-center mt-10">
            {videos.map((_, index) => (
              <button
                type="button"
                key={index}
                className={cn(
                  "w-3 h-3 mx-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                  index === currentIndex 
                    ? "bg-primary w-8" 
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-primary/50 hover:scale-125"
                )}
                onClick={() => goToIndex(index)}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Channel link below pagination */}
          <div className="flex justify-center mt-6">
            <a
              href={YOUTUBE_CHANNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <Youtube className="w-4 h-4 text-red-600" />
              <span>Visit @TheFinanceBrunch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Video Modal Player */}
      <YouTubeModal 
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
