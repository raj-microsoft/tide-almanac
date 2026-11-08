// Adapted from Magic UI NumberTicker (MIT, Magic UI). See references/MAGIC-UI-LICENSE.md.
// Source: https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/number-ticker.tsx
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  decimalPlaces?: number;
}
export function NumberTicker({
  value,
  decimalPlaces = 1,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, { stiffness: 450, damping: 35 });
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      springValue.jump(value);
      return;
    }
    motionValue.set(value);
    const timer = setTimeout(() => springValue.jump(value), 350);
    return () => clearTimeout(timer);
  }, [value, isInView, reduced, motionValue, springValue]);
  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current)
          ref.current.textContent = latest.toFixed(decimalPlaces);
      }),
    [springValue, decimalPlaces],
  );
  return (
    <span ref={ref} {...props}>
      {value.toFixed(decimalPlaces)}
    </span>
  );
}
