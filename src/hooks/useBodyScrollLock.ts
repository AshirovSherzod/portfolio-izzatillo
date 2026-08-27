import { useEffect } from "react";

/** Modal ochiq turganda orqa fon scroll bo'lmasligi uchun. */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isLocked]);
}
