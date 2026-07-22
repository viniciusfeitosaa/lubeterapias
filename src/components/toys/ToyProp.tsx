"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  getToy,
  type ToyId,
  type ToyPlacement,
  type ToySize,
} from "@/lib/toys";

const SIZE_CLASS: Record<ToySize, string> = {
  sm: "w-20 md:w-28",
  md: "w-28 md:w-40",
  lg: "w-36 md:w-52",
};

const PLACEMENT_CLASS: Record<ToyPlacement, string> = {
  "hero-left": "toy-slot-hero-left",
  "hero-right": "toy-slot-hero-right",
  "section-tr": "toy-slot-section-tr",
  "section-bl": "toy-slot-section-bl",
  "section-edge": "toy-slot-section-edge",
  flow: "toy-slot-flow",
};

type ToyPropProps = {
  id: ToyId;
  placement: ToyPlacement;
  size?: ToySize;
  interactive?: boolean;
  className?: string;
};

export function ToyProp({
  id,
  placement,
  size,
  interactive = true,
  className = "",
}: ToyPropProps) {
  const toy = getToy(id);
  const reduce = useReducedMotion();
  const resolvedSize = size ?? (toy.defaultSize as ToySize);
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 220, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 18 });
  const rotateX = useTransform(springY, [-28, 28], [10, -10]);
  const rotateY = useTransform(springX, [-28, 28], [-12, 12]);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!interactive || reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = event.clientX - rect.left - rect.width / 2;
    const py = event.clientY - rect.top - rect.height / 2;
    rawX.set(Math.max(-28, Math.min(28, px * 0.35)));
    rawY.set(Math.max(-28, Math.min(28, py * 0.35)));
  }

  function onPointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!interactive || reduce) return;
    onPointerMove(event);
  }

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`toy-slot ${PLACEMENT_CLASS[placement]} ${SIZE_CLASS[resolvedSize]} ${className}`}
      style={
        reduce || !interactive
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 700,
            }
      }
      animate={
        reduce
          ? undefined
          : {
              y: [0, -10, 0],
              rotate: [-2.5, 2.5, -2.5],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      whileHover={
        interactive && !reduce ? { scale: 1.05 } : undefined
      }
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
    >
      <Image
        src={toy.src}
        alt=""
        width={toy.width}
        height={toy.height}
        className="h-auto w-full select-none drop-shadow-[0_18px_28px_rgba(15,42,54,0.28)]"
        draggable={false}
      />
    </motion.div>
  );
}
