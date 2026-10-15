import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Youtube, ExternalLink, ChevronLeft, ChevronRight, 
  Eye, Calendar, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { youtubeVideos, YouTubeVideo, YOUTUBE_CHANNEL } from '@/data/youtubeVideos';
import { YouTubeModal } from './YouTubeModal';

export default function YouTubeShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Responsive cards per view: 3 on desktop (lg+), 2 on tablet (sm to lg), 1 on mobile (<sm)
  const [cardsPerView, setCardsPerView] = useState(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  });

  const touchStartXRef = useRef<number | null>(null);

  // Update cardsPerView on window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let nextCardsPerView = 3;
      if (width < 640) {
        nextCardsPerView = 1;
      } else if (width < 1024) {
        nextCardsPerView = 2;
      }
      setCardsPerView(nextCardsPerView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Maximum navigable start index so the last visible set never shows empty space
  const maxIndex = Math.max(0, youtubeVideos.length - cardsPerView);

  // Clamp currentIndex whenever cardsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const goToPrev = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsAnimating(false), 450);
  };

  const goToNext = () => {
    if (isAnimating || currentIndex === maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    setTimeout(() => setIsAnimating(false), 450);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    const target = Math.max(0, Math.min(maxIndex, index));
    setIsAnimating(true);
    setCurrentIndex(target);
    setTimeout(() => setIsAnimating(false), 450);
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

  // Total navigable dots: maxIndex + 1
  const totalNavigablePositions = maxIndex + 1;

  return (
    <section 
      id="insights-youtube"
      className="py-16 sm:py-20 md:py-24 bg-transparent overflow-hidden relative"
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
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[130px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            {/* Eyebrow Badge with YouTube Icon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 dark:border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Youtube className="w-3.5 h-3.5" />
              <span>WATCH & LEARN</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
              Insights From{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                The Finance Brunch
              </span>
            </h2>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore financial insights, investment education, market perspectives, and practical guidance from our YouTube channel.
            </p>
          </div>

          {/* Action Button linking to official channel */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <a
              href={YOUTUBE_CHANNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-all shadow-md shadow-red-600/20 hover:scale-105 active:scale-100"
            >
              <Youtube className="w-4 h-4" />
              <span>Visit Channel</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Clipped Carousel Viewport */}
          <div 
            className="relative overflow-hidden py-3"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out -mx-2.5 sm:-mx-3.5" 
              style={{ 
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` 
              }}
            >
              {youtubeVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2.5 sm:px-3.5"
                >
                  <div
                    onClick={() => handlePlayVideo(video)}
                    className={cn(
                      "relative rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between select-none group cursor-pointer h-full",
                      "backdrop-blur-2xl border shadow-lg hover:shadow-2xl hover:-translate-y-1.5",
                      "bg-white/95 dark:bg-[#071329]/95 border-slate-200/90 dark:border-slate-800/90 hover:border-red-500/40 dark:hover:border-red-400/40"
                    )}
                  >
                    {/* Video Thumbnail Area with 16:9 Aspect Ratio */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      <img 
                        src={video.maxResThumbnail}
                        alt={video.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = video.thumbnail;
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                        loading="lazy"
                      />

                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase border backdrop-blur-md",
                          video.tagColor.bg,
                          video.tagColor.text,
                          video.tagColor.border
                        )}>
                          {video.category}
                        </span>

                        <span className="backdrop-blur-md bg-black/60 text-white/90 text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-red-400" />
                          <span>{video.viewsFormatted}</span>
                        </span>
                      </div>

                      {/* Centered Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-115 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-white" />
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

                    {/* Video Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {video.title}
                        </h3>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Youtube className="w-3.5 h-3.5 text-red-600" />
                          <span>The Finance Brunch</span>
                        </span>
                        <span className="font-semibold text-blue-600 dark:text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Watch Video</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button */}
          <div className="absolute top-1/2 -left-3 sm:-left-5 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "rounded-full w-10 h-10 sm:w-11 sm:h-11 shadow-lg backdrop-blur-md transition-all duration-200",
                "bg-white/95 dark:bg-slate-900/95 border-slate-200/90 dark:border-slate-800",
                "hover:bg-white dark:hover:bg-slate-800 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-red-500",
                currentIndex === 0 
                  ? "opacity-30 cursor-not-allowed hover:scale-100" 
                  : "opacity-100 hover:border-red-500/50"
              )}
              onClick={goToPrev}
              disabled={currentIndex === 0}
              aria-label="Previous videos"
            >
              <ChevronLeft size={20} className="text-slate-700 dark:text-slate-200 transition-transform duration-200 hover:-translate-x-0.5" />
            </Button>
          </div>

          {/* Right Arrow Button */}
          <div className="absolute top-1/2 -right-3 sm:-right-5 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "rounded-full w-10 h-10 sm:w-11 sm:h-11 shadow-lg backdrop-blur-md transition-all duration-200",
                "bg-white/95 dark:bg-slate-900/95 border-slate-200/90 dark:border-slate-800",
                "hover:bg-white dark:hover:bg-slate-800 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-red-500",
                currentIndex === maxIndex 
                  ? "opacity-30 cursor-not-allowed hover:scale-100" 
                  : "opacity-100 hover:border-red-500/50"
              )}
              onClick={goToNext}
              disabled={currentIndex === maxIndex}
              aria-label="Next videos"
            >
              <ChevronRight size={20} className="text-slate-700 dark:text-slate-200 transition-transform duration-200 hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Pagination Indicators & Counter Below Carousel (No page scrolling) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 sm:mt-10">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalNavigablePositions }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer",
                    index === currentIndex 
                      ? "bg-red-600 dark:bg-red-500 w-8 shadow-sm shadow-red-500/30" 
                      : "bg-slate-300 dark:bg-slate-700 w-2.5 hover:bg-red-400 dark:hover:bg-red-600 hover:scale-125"
                  )}
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to video set ${index + 1}`}
                />
              ))}
            </div>

            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 sm:ml-2">
              0{currentIndex + 1} / 0{totalNavigablePositions}
            </span>
          </div>

        </div>
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
