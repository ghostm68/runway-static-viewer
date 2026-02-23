import { useEffect, useState } from "react";

const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinished, 500);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* TV Static background */}
      <div className="absolute inset-0 tv-static opacity-20" />

      {/* Scanlines */}
      <div className="absolute inset-0 scanline-overlay scanline-sweep" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="animate-flicker">
          <h1 className="font-mono-display text-4xl font-bold text-primary tracking-widest">
            runWay
          </h1>
        </div>

        <div className="w-48 h-0.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-200 ease-out animate-glow-pulse"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <p className="font-mono-display text-xs text-muted-foreground tracking-wider uppercase">
          initializing signal...
        </p>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/40" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/40" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/40" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/40" />
    </div>
  );
};

export default LoadingScreen;
