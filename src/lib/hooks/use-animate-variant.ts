import {
  useAnimate,
  type AnimationPlaybackControlsWithThen,
  type AnimationScope,
  type DOMKeyframesDefinition,
} from "motion/react";
import { useCallback, type RefObject } from "react";

export type ClickVariant = "initial" | "hover" | "idle" | "click";

export type PathConfig = {
  keyframes: number[];
  times: number[];
  repeat?: boolean;
};

export type VariantDefinition = {
  transition?: Record<string, unknown>;
} & DOMKeyframesDefinition;

type AnimateFunction = ReturnType<typeof useAnimate<SVGGElement>>[1];

export type AnimateVariant = (
  selector: string,
  variant: VariantDefinition | null | undefined | false,
) => AnimationPlaybackControlsWithThen | undefined;

export function useAnimateVariant(): [
  AnimationScope<SVGGElement>,
  AnimateVariant,
  AnimateFunction,
] {
  const [scope, animate] = useAnimate<SVGGElement>();

  const animateVariant = useCallback<AnimateVariant>(
    (selector, variant) => {
      if (!variant) return;
      const { transition, ...values } = variant;
      return animate(selector, values, transition ?? {
        type: "spring",
        stiffness: 800,
        damping: 80,
        mass: 4,
      });
    },
    [animate],
  );

  return [scope, animateVariant, animate];
}

export type HandPathAnimationRef = RefObject<AnimationPlaybackControlsWithThen | null>;
