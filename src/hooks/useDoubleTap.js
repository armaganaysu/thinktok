import { useRef, useCallback } from 'react';

export const useDoubleTap = (onDoubleTap, delay = 300) => {
  const lastTap = useRef(null);

  const handleDoubleTap = useCallback((params) => {
    const now = Date.now();
    if (lastTap.current && (now - lastTap.current) < delay) {
      onDoubleTap(params);
    }
    lastTap.current = now;
  }, [onDoubleTap, delay]);

  return handleDoubleTap;
}; 