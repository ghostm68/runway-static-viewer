import { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MIRROR_URL = "https://inkrealm.info/runway";
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

const MirrorViewer = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const refreshIframe = useCallback(() => {
    if (!isOnline) {
      toast({
        title: "Offline",
        description: "No internet connection. Cannot refresh.",
        variant: "destructive",
      });
      return;
    }

    setIsRefreshing(true);
    if (iframeRef.current) {
      iframeRef.current.src = MIRROR_URL + "?t=" + Date.now();
    }

    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
      toast({
        title: "Refreshed",
        description: "Content updated successfully.",
      });
    }, 1000);
  }, [isOnline, toast]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({ title: "Back online", description: "Connection restored." });
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Offline",
        description: "Connection lost.",
        variant: "destructive",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [toast]);

  // Auto-refresh
  useEffect(() => {
    const interval = setInterval(refreshIframe, AUTO_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [refreshIframe]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="relative flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-border bg-card scanline-overlay">
        <div className="flex items-center gap-3">
          <h1 className="font-mono-display text-lg font-bold text-primary tracking-wider">
            inkrealm
          </h1>
          <div className="flex items-center gap-1.5">
            {isOnline ? (
              <Wifi className="w-3.5 h-3.5 text-primary" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-destructive" />
            )}
            <span
              className={`font-mono-display text-[10px] uppercase tracking-wider ${
                isOnline ? "text-primary" : "text-destructive"
              }`}
            >
              {isOnline ? "live" : "offline"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono-display text-[10px] text-muted-foreground">
            {formatTime(lastUpdate)}
          </span>
          <button
            onClick={refreshIframe}
            disabled={isRefreshing}
            className="p-2 rounded-md border border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
            aria-label="Refresh"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Iframe */}
      <div className="relative flex-1 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={MIRROR_URL}
          className="w-full h-full border-0"
          title="runway mirror"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />

        {/* Offline overlay */}
        {!isOnline && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/95">
            <div className="tv-static absolute inset-0 opacity-10" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <WifiOff className="w-12 h-12 text-destructive" />
              <p className="font-mono-display text-lg text-foreground">
                No Signal
              </p>
              <p className="font-mono-display text-xs text-muted-foreground">
                Check your connection
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MirrorViewer;
