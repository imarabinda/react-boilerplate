import { useMemoizedFn } from "ahooks";
import { useEffect, useRef, useState } from "react";

export default function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = useState(0);
  const start = useRef(0);
  const animationFrame = useRef(0);
  const timerStop = useRef<Nullable<ReturnType<typeof setTimeout>>>(null);

  const loop = useMemoizedFn(() => {
    animationFrame.current = requestAnimationFrame(onFrame);
  });
  const onFrame = useMemoizedFn(() => {
    setTime(Date.now() - start.current);
    loop();
  });

  const onStart = useMemoizedFn(() => {
    // Set a timeout to stop things when duration time elapses
    timerStop.current = setTimeout(() => {
      cancelAnimationFrame(animationFrame.current);
      setTime(Date.now() - start.current);
    }, duration);
    // Start the loop
    start.current = Date.now();
    loop();
  });

  useEffect(
    () => {
      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);
      // Clean things up
      return () => {
        if (timerStop.current) {
          clearTimeout(timerStop.current);
        }
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame.current);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [duration, delay] // Only re-run effect if duration or delay changes
  );
  return elapsed;
}
