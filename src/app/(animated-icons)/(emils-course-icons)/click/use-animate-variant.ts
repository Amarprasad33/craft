import { useAnimate } from "motion/react";
import { useCallback } from "react";

export function useAnimateVariant() {
  const [scope, animate] = useAnimate();

  const animateVariant = useCallback(
    (selector: any, variant: any) => {
      if (!variant) return;
      const { transition, ...values } = variant;
      return animate(selector, values, transition ?? {
        type: "spring",
        stiffness: 800,
        damping: 80,
        mass: 4,
      });
    },
    [animate]
  );

  return [scope, animateVariant, animate];
}