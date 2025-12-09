"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const onlineHandler = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3500);
    };
    const offlineHandler = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);
    setIsOnline(navigator.onLine);

    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.error("Service worker registration failed", err));

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <>
      {children}
      {showBanner && (
        <div
          className={cn(
            "fixed bottom-4 left-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 rounded-full border border-border bg-white/90 px-4 py-2 shadow-lg backdrop-blur",
            !isOnline && "border-destructive/40 bg-red-50/90",
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-emerald-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-destructive" />
            )}
            {isOnline ? "Back online. Data stays cached for offline use." : "Offline mode: cached tools still work."}
          </div>
        </div>
      )}
    </>
  );
}
