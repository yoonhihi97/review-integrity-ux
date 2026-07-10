import { useEffect, useState, type ReactNode } from "react";

const DEVICE_WIDTH = 390;
const DEVICE_HEIGHT = 884;
const DESKTOP_BREAKPOINT = 900;

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
    <div className="h-[100dvh] w-full flex items-center justify-center bg-[#1a1a1a] overflow-hidden">
      <div
        className="relative bg-black rounded-[48px] p-[14px] shadow-2xl box-border"
        style={{
          height: `min(${DEVICE_HEIGHT + 28}px, calc(100dvh - 48px))`,
          aspectRatio: `${DEVICE_WIDTH + 28} / ${DEVICE_HEIGHT + 28}`,
        }}
      >
        <div className="absolute top-[1.5%] left-1/2 -translate-x-1/2 w-[30%] h-[3%] bg-black rounded-b-2xl z-10" />
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
