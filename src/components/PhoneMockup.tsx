import { useEffect, useState, type ReactNode } from "react";

const DEVICE_WIDTH = 390;
const DEVICE_HEIGHT = 884;
const DESKTOP_BREAKPOINT = 900;

const PAD_X = 14;
const PAD_TOP = 14;
const PAD_BOTTOM = 14;
const FRAME_WIDTH = DEVICE_WIDTH + PAD_X * 2;
const FRAME_HEIGHT = DEVICE_HEIGHT + PAD_TOP + PAD_BOTTOM;

function isInIframe() {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function shouldShowMockup() {
  return !isInIframe() && window.innerWidth >= DESKTOP_BREAKPOINT;
}

export default function PhoneMockup({ children }: { children: ReactNode }) {
  const [showMockup, setShowMockup] = useState(shouldShowMockup);

  useEffect(() => {
    const handleResize = () => setShowMockup(shouldShowMockup());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!showMockup) return <>{children}</>;

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center bg-gradient-to-b from-[#eef0f3] to-[#dde1e6] overflow-hidden">
      <div
        className="relative bg-gradient-to-b from-[#2b2d33] to-[#0b0c0f] rounded-[48px] shadow-2xl box-border ring-1 ring-white/10"
        style={{
          height: `min(${FRAME_HEIGHT}px, calc(100dvh - 48px))`,
          aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}`,
          padding: `${PAD_TOP}px ${PAD_X}px ${PAD_BOTTOM}px`,
        }}
      >
        {/* side buttons */}
        <div className="absolute left-[-2px] top-[110px] w-[2px] h-[28px] bg-[#0b0c0f] rounded-l-sm" />
        <div className="absolute left-[-2px] top-[150px] w-[2px] h-[46px] bg-[#0b0c0f] rounded-l-sm" />
        <div className="absolute left-[-2px] top-[204px] w-[2px] h-[46px] bg-[#0b0c0f] rounded-l-sm" />
        <div className="absolute right-[-2px] top-[160px] w-[2px] h-[64px] bg-[#0b0c0f] rounded-r-sm" />

        <div className="relative bg-white rounded-[36px] overflow-hidden w-full h-full">
          <iframe
            src={window.location.href}
            title="mobile-preview"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
