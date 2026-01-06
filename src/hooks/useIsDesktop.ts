import { useEffect, useState } from "react";

const MOBILE_USER_AGENT_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

function detectIsDesktop(): boolean {
  if (typeof window === "undefined") {
    // During SSR, assume desktop to avoid hydration mismatch
    return true;
  }

  const userAgent = navigator.userAgent || navigator.vendor;

  // 1. User agent check
  const isMobileUA = MOBILE_USER_AGENT_REGEX.test(userAgent);

  // 2. Pointer & hover capability check
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;

  // Decision logic
  if (isMobileUA) return false;

  if (!hasFinePointer && !canHover) return false;

  return true;
}

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(detectIsDesktop);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(detectIsDesktop());
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return isDesktop;
}
