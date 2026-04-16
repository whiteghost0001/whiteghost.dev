"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface RotatingTextHandle {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
}

const RotatingText = forwardRef<RotatingTextHandle, RotatingTextProps>(
  ({ texts, rotationInterval = 3200, className = "" }, ref) => {
    const [index, setIndex] = useState(0);

    const next = useCallback(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, [texts.length]);

    const previous = useCallback(() => {
      setIndex((i) => (i - 1 + texts.length) % texts.length);
    }, [texts.length]);

    const jumpTo = useCallback(
      (i: number) => setIndex(Math.max(0, Math.min(i, texts.length - 1))),
      [texts.length]
    );

    const reset = useCallback(() => setIndex(0), []);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval]);

    return (
      // Outer span reserves height so layout doesn't shift between items
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          overflow: "hidden",
          // Fix height to the tallest item so nothing shifts
          height: "1.2em",
          verticalAlign: "middle",
        }}
      >
        {/* SR-only live region for accessibility */}
        <span
          aria-live="polite"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {texts[index]}
        </span>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            aria-hidden="true"
            initial={{ opacity: 0, y: "40%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-40%" }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
