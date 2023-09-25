"use client";

import {
  type MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

const HorizontalScrollBox = ({
  scrollYProgress,
  position,
}: {
  scrollYProgress: MotionValue<number>;
  position: number;
}) => {
  const translateX = useTransform(() => {
    const horizontalPadding = 40 * position;
    const totalWidth = 96 * 4 * 10;
    const positionOffset = position * 96 * 4 + horizontalPadding;

    return scrollYProgress.get() * totalWidth * -1 + positionOffset;
  });

  return (
    <motion.div
      transition={{
        type: "spring",
      }}
      style={{
        translateX,
      }}
      className="bg-white h-96 w-96 absolute top-0 left-0"
    >
      {position}
    </motion.div>
  );
};

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 75%", "end 75%"],
  });

  return (
    <main className="bg-red-700 overflow-clip">
      <div className="bg-blue-500 gap-4 flex flex-col items-center justify-start py-10">
        <div className="bg-white h-96 w-96"></div>
        <div className="bg-white h-96 w-96"></div>
        <div className="bg-white h-96 w-96"></div>
        <div className="bg-white h-96 w-96"></div>
      </div>
      <div
        ref={targetRef}
        className="bg-red-500 py-10 relative h-[calc(12*96px*4)]"
      >
        <div className="sticky h-96 top-[calc(50%-192px)] bg-green-500 translate-x-1/2">
          <div className="relative -translate-x-48">
            {new Array(10).fill(0).map((_, i) => (
              <HorizontalScrollBox
                key={`horizontal-scroll-box-${i}`}
                position={i}
                scrollYProgress={scrollYProgress}
              ></HorizontalScrollBox>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-blue-500 gap-4 flex flex-col items-center justify-start py-10">
        <div className="bg-white h-96 w-96"></div>
        <div className="bg-white h-96 w-96"></div>
        <div className="bg-white h-96 w-96"></div>
        <div className="bg-white h-96 w-96"></div>
      </div>
    </main>
  );
}
