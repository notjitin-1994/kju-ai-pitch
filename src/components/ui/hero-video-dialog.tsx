"use client";

import { useState } from "react";
import { Play, X as XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "../../lib/utils";

interface HeroVideoProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
  durationLabel?: string;
  externallyOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  durationLabel,
  externallyOpen,
  onOpenChange,
}: HeroVideoProps) {
  const [internallyOpen, setInternallyOpen] = useState(false);
  const isOpen = externallyOpen ?? internallyOpen;
  const setOpen = (v: boolean) => {
    setInternallyOpen(v);
    onOpenChange?.(v);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Play film"
        className="group relative cursor-pointer border-0 bg-transparent p-0 w-full press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7DADB]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#020C1B] rounded-[24px]"
        onClick={() => setOpen(true)}
      >
        <div
          className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -20px rgba(0,0,0,0.7)",
          }}
        >
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            width={1920}
            height={1080}
            className="w-full object-cover aspect-video"
            style={{
              transition: "transform 700ms var(--ease-out-expo), filter 500ms var(--ease-out-expo)",
              filter: "contrast(1.1) saturate(0.9) brightness(0.85)",
            }}
          />

          {/* Cinematic gradient cap */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(2,12,27,0.05) 0%, rgba(2,12,27,0.55) 100%)",
            }}
          />

          {/* Letterbox-ish bars */}
          <div aria-hidden className="absolute top-0 inset-x-0 h-[6%] bg-black/70" />
          <div aria-hidden className="absolute bottom-0 inset-x-0 h-[6%] bg-black/70" />

          {/* Centered play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative flex items-center justify-center"
              style={{ transition: "transform 350ms var(--ease-out-expo)" }}
            >
              <span
                aria-hidden
                className="absolute inline-flex h-24 w-24 rounded-full bg-[#A7DADB]/20 backdrop-blur-md border border-[#A7DADB]/30"
              />
              <span
                aria-hidden
                className="absolute inline-flex h-32 w-32 rounded-full border border-[#A7DADB]/20 animate-soft-pulse"
              />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#A7DADB] shadow-[0_8px_30px_rgba(167,218,219,0.45)]">
                <Play className="h-5 w-5 fill-[#020C1B] text-[#020C1B] translate-x-[1px]" strokeWidth={0} />
              </div>
            </div>
          </div>

          {/* Duration chip */}
          {durationLabel && (
            <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
              <span className="font-display text-[11px] tracking-[0.3em] uppercase text-white/85 tabular-nums">
                {durationLabel}
              </span>
            </div>
          )}

          {/* Project chip */}
          <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#A7DADB]/90 font-bold">
              Film  ·  Project Institutional Intelligence
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") setOpen(false);
            }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 md:p-12"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl aspect-video mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute -top-14 right-0 rounded-full bg-white/10 p-3 text-white border border-white/20 hover:bg-white/20 backdrop-blur-xl press-scale"
                style={{ transition: "background-color 200ms var(--ease-out-expo), transform 160ms var(--ease-out-expo)" }}
              >
                <XIcon className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <div
                className="relative isolate size-full overflow-hidden rounded-[24px] border border-[#A7DADB]/25 bg-[#020C1B]"
                style={{
                  boxShadow: "0 40px 80px -20px rgba(167,218,219,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <video src={videoSrc} className="size-full object-cover" controls autoPlay />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
