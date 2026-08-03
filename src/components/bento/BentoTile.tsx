import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'motion/react';

interface BentoTileProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  glow?: boolean;
}

export const BentoTileReact: React.FC<BentoTileProps> = ({
  children,
  className = '',
  href,
  glow = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXSpring = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateYSpring = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width;
    const y = (e.clientY - rect.top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateXSpring,
        rotateY: shouldReduceMotion ? 0 : rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      className={`bento-tile block p-8 rounded-[24px] relative overflow-hidden transition-shadow duration-300 ${
        glow
          ? 'before:absolute before:-inset-px before:rounded-[24px] before:bg-gradient-to-br before:from-blue-500/20 before:via-blue-500/5 before:to-transparent'
          : ''
      } ${className}`}
    >
      <div style={{ transform: 'translateZ(10px)' }}>{children}</div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[24px]">
        {content}
      </a>
    );
  }

  return content;
};

export default BentoTileReact;
