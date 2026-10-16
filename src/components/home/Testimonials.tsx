import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/ui/animation';
import { fetchLiveGoogleReviews, type GoogleReview } from '@/services/api';

function formatReviewDate(review: GoogleReview) {
  if (review.time) {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(review.time);
  }

  return review.relativeTime || 'Google review';
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetchLiveGoogleReviews()
      .then((response) => {
        if (!mounted) return;
        if (response.success && response.configured && response.reviews.length > 0) {
          setReviews(response.reviews);
          setGoogleMapsUrl(response.googleMapsUrl || null);
        } else {
          setReviews([]);
          setGoogleMapsUrl(response.googleMapsUrl || null);
        }
      })
      .catch(() => {
        if (mounted) setReviews([]);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (reviews.length < 2) return;

    const timer = setInterval(() => {
      setCurrentIndex((previous) => (previous === reviews.length - 1 ? 0 : previous + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const changeReview = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    window.setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevious = () => {
    if (!reviews.length) return;
    changeReview(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    if (!reviews.length) return;
    changeReview(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section id="testimonials" className="py-24 bg-transparent overflow-hidden">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Google Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Clients Say About Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Read feedback from clients on our Google Business Profile.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.15} className="relative max-w-4xl mx-auto min-h-[340px]">
          {isLoading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-100 bg-white/70 p-8 text-center shadow-md dark:border-gray-800 dark:bg-gray-900/70">
              <p className="text-gray-600 dark:text-gray-400" role="status">Loading Google reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white/70 p-8 text-center shadow-md dark:border-gray-800 dark:bg-gray-900/70">
              <Quote size={48} className="mb-6 text-primary/20" aria-hidden="true" />
              <p className="max-w-lg text-lg text-gray-600 dark:text-gray-400">
                Google reviews are temporarily unavailable. Please visit our Google profile to read the latest reviews.
              </p>
              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  View Google reviews <ExternalLink size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          ) : (
            <>
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {reviews.map((review) => (
                    <div key={review.id} className="w-full flex-shrink-0 px-4">
                      <article className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:border-primary/25 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 md:p-10">
                        <Quote size={48} className="mb-6 text-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:text-primary/40" aria-hidden="true" />
                        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 md:text-xl">
                          “{review.text}”
                        </p>
                        <div className="flex items-center">
                          <img
                            src={review.authorPhoto}
                            alt=""
                            className="mr-4 h-14 w-14 rounded-full border-2 border-primary/20 object-cover transition-all duration-300 group-hover:border-primary/50 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div>
                            <h3 className="text-lg font-semibold">{review.authorName}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{formatReviewDate(review)}</p>
                            <div className="mt-1 flex" aria-label={`${review.rating} out of 5 stars`}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={16}
                                  className={cn(star <= review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300')}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {reviews.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 dark:bg-gray-900/80 sm:-left-3 lg:-left-5"
                    onClick={goToPrevious}
                    aria-label="Previous Google review"
                  >
                    <ChevronLeft size={20} aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 dark:bg-gray-900/80 sm:-right-3 lg:-right-5"
                    onClick={goToNext}
                    aria-label="Next Google review"
                  >
                    <ChevronRight size={20} aria-hidden="true" />
                  </Button>
                  <div className="mt-10 flex justify-center">
                    {reviews.map((review, index) => (
                      <button
                        type="button"
                        key={review.id}
                        className={cn(
                          'mx-1 h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                          index === currentIndex ? 'w-8 bg-primary' : 'w-3 bg-gray-300 hover:bg-primary/50 dark:bg-gray-700'
                        )}
                        onClick={() => changeReview(index)}
                        aria-label={`Go to Google review ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {googleMapsUrl && (
                <div className="mt-8 text-center">
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                    See all reviews on Google <ExternalLink size={15} aria-hidden="true" />
                  </a>
                </div>
              )}
            </>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
