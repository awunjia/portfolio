type LottieShimmerProps = {
  className?: string;
};

/** Placeholder shown while a Lottie or dotLottie asset is loading. */
export function LottieShimmer({ className = "" }: LottieShimmerProps) {
  return (
    <div
      className={`lottie-shimmer overflow-hidden rounded-2xl ${className}`.trim()}
      aria-hidden
    />
  );
}
