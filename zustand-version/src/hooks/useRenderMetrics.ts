import { useEffect, useRef } from "react";

export function useRenderMetrics(componentName: string) {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current += 1;
    const now = performance.now();
    const sinceLast = now - lastRenderTimeRef.current;

    console.log(
      `[METRICS] ${componentName} render #${renderCountRef.current} (+${sinceLast.toFixed(
        2
      )} ms)`
    );

    lastRenderTimeRef.current = now;
  });
}