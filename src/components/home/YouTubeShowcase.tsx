import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { youtubeVideos, type YouTubeVideo, YOUTUBE_CHANNEL } from '@/data/youtubeVideos';
import { fetchLiveYouTubeVideos } from '@/services/api';
import { YouTubeModal } from './YouTubeModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollWindowTo } from '@/lib/smoothScroll';
import './YouTubeShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const PIN_OFFSET = 84;

type Particle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  driftX: number;
  driftY: number;
  warm: boolean;
};

export default function YouTubeShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>(youtubeVideos);

  const currentIndexRef = useRef(0);
  const videosRef = useRef(videos);
  videosRef.current = videos;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const navigateToIndexRef = useRef<(index: number) => void>(() => undefined);
  const metricsRef = useRef({
    horizontalTravel: 0,
    viewportWidth: 0,
    slideCenters: [] as number[],
    navbarHeight: PIN_OFFSET,
  });

  const getProgressForVideo = (index: number) => {
    const { horizontalTravel, viewportWidth, slideCenters } = metricsRef.current;
    const center = slideCenters[index];
    if (!horizontalTravel || viewportWidth === 0 || center === undefined) return 0;
    return Math.min(1, Math.max(0, (center - viewportWidth / 2) / horizontalTravel));
  };

  const setActiveIndex = (index: number) => {
    if (currentIndexRef.current === index) return;
    currentIndexRef.current = index;
    paginationRef.current?.querySelectorAll<HTMLButtonElement>('[data-video-dot]').forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  const navigateToIndex = (index: number) => {
    const count = videosRef.current.length;
    if (!count) return;
    const targetIndex = Math.min(Math.max(index, 0), count - 1);
    const trigger = triggerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const slide = track?.querySelectorAll<HTMLElement>('[data-video-slide]')[targetIndex];

    setActiveIndex(targetIndex);

    if (trigger) {
      const progress = getProgressForVideo(targetIndex);
      scrollWindowTo(trigger.start + progress * (trigger.end - trigger.start), true);
    } else if (viewport && slide) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      viewport.scrollTo({
        left: slide.offsetLeft,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };
  navigateToIndexRef.current = navigateToIndex;

  const focusCardInRail = (index: number) => {
    navigateToIndexRef.current(index);
  };

  const goToIndex = (index: number) => {
    navigateToIndexRef.current(index);
  };

  const goToPrev = () => {
    const count = videosRef.current.length;
    if (count) goToIndex((currentIndexRef.current - 1 + count) % count);
  };

  const goToNext = () => {
    const count = videosRef.current.length;
    if (count) goToIndex((currentIndexRef.current + 1) % count);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const diffX = touchStartXRef.current - touchEndX;
    if (Math.abs(diffX) > 40 && triggerRef.current) {
      if (diffX > 0) goToNext();
      else goToPrev();
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

  const handleSkipVideos = () => {
    const footer = document.getElementById('contact') ?? document.querySelector<HTMLElement>('footer');
    if (!footer) return;
    const fixedHeader = Array.from(document.querySelectorAll<HTMLElement>('header')).find(
      (header) => getComputedStyle(header).position === 'fixed',
    );
    const navbarHeight = fixedHeader?.getBoundingClientRect().height ?? PIN_OFFSET;
    const footerTop = footer.getBoundingClientRect().top + window.scrollY - navbarHeight;
    scrollWindowTo(Math.max(0, footerTop), true);
  };

  useEffect(() => {
    let mounted = true;
    fetchLiveYouTubeVideos().then((result) => {
      if (!mounted || result.videos.length === 0) return;
      videosRef.current = result.videos;
      currentIndexRef.current = 0;
      setVideos(result.videos);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    const scroll = scrollRef.current;
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!scroll || !stage || !viewport || !track || !progress) return;

    const media = gsap.matchMedia();
    let refreshFrame = 0;

    const measure = () => {
      const fixedHeader = Array.from(document.querySelectorAll<HTMLElement>('header')).find(
        (header) => getComputedStyle(header).position === 'fixed',
      );
      const navbarHeight = fixedHeader?.getBoundingClientRect().height ?? PIN_OFFSET;
      const viewportWidth = viewport.clientWidth;
      const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-video-slide]'));
      metricsRef.current = {
        horizontalTravel: Math.max(track.scrollWidth - viewportWidth, 0),
        viewportWidth,
        slideCenters: slides.map((slide) => slide.offsetLeft + slide.offsetWidth / 2),
        navbarHeight,
      };
      stage.style.setProperty('--fb-pin-offset', navbarHeight + 'px');
    };

    const refresh = () => {
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0;
        measure();
        ScrollTrigger.refresh();
      });
    };

    media.add('(prefers-reduced-motion: no-preference) and (min-width: 701px)', () => {
      measure();
      scroll.dataset.animated = 'true';

      const renderProgress = (progressValue: number) => {
        const { horizontalTravel, viewportWidth, slideCenters } = metricsRef.current;
        const offset = horizontalTravel * progressValue;
        progress.style.transform = 'scaleX(' + progressValue.toFixed(4) + ')';

        const viewportCenter = viewportWidth / 2;
        let activeIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;
        for (const [index, center] of slideCenters.entries()) {
          const distance = Math.abs(center - offset - viewportCenter);
          if (distance < nearestDistance) {
            activeIndex = index;
            nearestDistance = distance;
          }
        }
        setActiveIndex(activeIndex);
      };

      const animation = gsap.to(track, {
        x: () => -metricsRef.current.horizontalTravel,
        ease: 'none',
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        id: 'fb-cinematic-horizontal-rail',
        trigger: scroll,
        pin: stage,
        pinSpacing: true,
        start: () => 'top top+=' + metricsRef.current.navbarHeight,
        end: () => '+=' + Math.max(metricsRef.current.horizontalTravel, 1),
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation,
        onRefreshInit: measure,
        onUpdate: (self) => renderProgress(self.progress),
        onRefresh: (self) => renderProgress(self.progress),
      });
      triggerRef.current = trigger;

      const resizeObserver = new ResizeObserver(refresh);
      resizeObserver.observe(viewport);
      resizeObserver.observe(track);
      window.addEventListener('resize', refresh);
      refresh();

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', refresh);
        if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
        triggerRef.current = null;
        trigger.kill(true);
        animation.kill();
        scroll.dataset.animated = 'false';
        gsap.set(track, { clearProps: 'transform' });
        gsap.set(progress, { clearProps: 'transform' });
        stage.style.removeProperty('--fb-pin-offset');
      };
    });

    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    if (!triggerRef.current || videos === youtubeVideos) return;
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(refreshFrame);
  }, [videos]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let isVisible = false;
    let particles: Particle[] = [];

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        context.beginPath();
        context.fillStyle = particle.warm
          ? 'rgba(240, 171, 191, ' + particle.alpha + ')'
          : 'rgba(237, 231, 236, ' + particle.alpha + ')';
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
        if (particle.radius > 1.15) {
          context.beginPath();
          context.fillStyle = particle.warm
            ? 'rgba(230, 112, 151, ' + (particle.alpha * 0.12) + ')'
            : 'rgba(246, 232, 238, ' + (particle.alpha * 0.08) + ')';
          context.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const animate = (time: number) => {
      frame = 0;
      if (document.hidden || reducedMotion.matches || !isVisible) return;
      if (time - lastFrame < 33) {
        frame = window.requestAnimationFrame(animate);
        return;
      }
      const delta = Math.min((time - (lastFrame || time)) / 16.67, 2);
      lastFrame = time;
      for (const particle of particles) {
        particle.x += particle.driftX * delta;
        particle.y += particle.driftY * delta;
        if (particle.x < -3) particle.x = width + 3;
        if (particle.x > width + 3) particle.x = -3;
        if (particle.y < -3) particle.y = height + 3;
        if (particle.y > height + 3) particle.y = -3;
      }
      draw();
      frame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (document.hidden || reducedMotion.matches || !isVisible || frame) {
        if (reducedMotion.matches) draw();
        return;
      }
      lastFrame = 0;
      frame = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.max(18, Math.min(42, Math.round(width * height / 125000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() > 0.91 ? 1.35 : 0.55 + Math.random() * 0.55,
        alpha: 0.12 + Math.random() * 0.28,
        driftX: (Math.random() - 0.5) * 0.12,
        driftY: (Math.random() - 0.5) * 0.1,
        warm: Math.random() > 0.48,
      }));
      draw();
      start();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        start();
      }
    };

    const handleMotionPreference = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      if (reducedMotion.matches) draw();
      else start();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      canvas.style.visibility = isVisible ? 'visible' : 'hidden';
      if (isVisible) start();
      else if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    intersectionObserver.observe(stage);
    resize();
    canvas.style.visibility = 'hidden';
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', handleMotionPreference);

    return () => {
      intersectionObserver.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', handleMotionPreference);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="insights-youtube"
      className="fb-cinematic"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Latest Videos from The Finance Brunch"
    >
      <canvas ref={canvasRef} className="fb-cinematic__particles" aria-hidden="true" />

      <div ref={scrollRef} className="fb-cinematic__scroll" data-animated="false">
        <div
          ref={stageRef}
          className="fb-cinematic__stage"
        >
          <div className="fb-cinematic__header">
            <div className="fb-cinematic__header-copy">
              <h2 className="fb-cinematic__title">
                Latest Videos from <span>The Finance Brunch</span>
              </h2>
              <p className="fb-cinematic__subtitle">
                Financial insights, market updates, and investment education.
              </p>
            </div>
            <button
              type="button"
              className="fb-youtube__skip"
              onClick={handleSkipVideos}
              aria-label="Skip videos and continue to the footer"
            >
              Skip videos <span aria-hidden="true">↓</span>
            </button>
          </div>

          <div
            ref={viewportRef}
            className="fb-cinematic__rail-window fb-youtube__viewport"
            aria-label="The Finance Brunch YouTube videos"
            aria-roledescription="carousel"
            tabIndex={0}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div ref={trackRef} className="fb-cinematic__track fb-youtube__track">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="fb-youtube__slide"
                  data-video-slide
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Video ${index + 1} of ${videos.length}`}
                >
                  <button
                    type="button"
                    className="fb-youtube__video-card group"
                    onClick={() => handlePlayVideo(video)}
                    onFocus={() => focusCardInRail(index)}
                    aria-label={`Play video: ${video.title}`}
                  >
                    <span className="fb-youtube__card-inner">
                      <span className="fb-youtube__media">
                        <img
                          src={video.thumbnail}
                          srcSet={`${video.thumbnail} 480w, ${video.maxResThumbnail} 1280w`}
                          sizes="(max-width: 700px) 90vw, (max-width: 1024px) 48vw, 530px"
                          alt={video.title}
                          onError={(event) => {
                            const image = event.currentTarget;
                            if (image.dataset.fallbackAttempted) return;
                            image.dataset.fallbackAttempted = 'true';
                            image.removeAttribute('srcSet');
                            image.src = image.currentSrc === video.thumbnail
                              ? video.maxResThumbnail
                              : video.thumbnail;
                          }}
                          className="fb-youtube__thumbnail"
                          loading={index < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                        <span className="fb-youtube__vignette" aria-hidden="true" />
                        <span className="fb-youtube__badges">
                          <span className={cn('fb-youtube__badge', video.tagColor.bg, video.tagColor.text, video.tagColor.border)}>
                            {video.category}
                          </span>
                        </span>
                        <span className="fb-youtube__play" aria-hidden="true">
                          <Play size={24} fill="currentColor" />
                        </span>
                      </span>

                      <span className="fb-youtube__details">
                        <span className="fb-youtube__title">{video.title}</span>
                      </span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="fb-cinematic__progress-track" aria-hidden="true">
            <div ref={progressRef} className="fb-cinematic__progress-fill" />
          </div>

          <div className="fb-youtube__footer">
            <div className="fb-youtube__navigation">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="fb-youtube__arrow"
                onClick={goToPrev}
                aria-label="Previous video"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </Button>
              <div ref={paginationRef} className="fb-youtube__pagination" aria-label="Choose a video">
                {videos.map((video, index) => (
                  <button
                    type="button"
                    key={video.id}
                    className={cn('fb-youtube__dot', index === currentIndexRef.current && 'is-active')}
                    data-video-dot
                    onClick={() => goToIndex(index)}
                    aria-label={`Go to video ${index + 1}: ${video.title}`}
                    aria-current={index === currentIndexRef.current ? 'true' : undefined}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="fb-youtube__arrow"
                onClick={goToNext}
                aria-label="Next video"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </Button>
            </div>
            <a
              href={YOUTUBE_CHANNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="fb-youtube__channel-link"
              title={`Visit ${YOUTUBE_CHANNEL.name} on YouTube`}
            >
              <Youtube size={16} aria-hidden="true" />
              <span>Visit YouTube Channel</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <YouTubeModal video={selectedVideo} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
