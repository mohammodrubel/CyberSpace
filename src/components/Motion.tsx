"use client";

import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;
const view = { once: true, margin: "-60px 0px" };

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function FadeUp({ children, delay = 0, className, style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.62, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function FadeDown({ children, delay = 0, className, style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.55, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function FadeLeft({ children, delay = 0, className, style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={view}
      transition={{ duration: 0.62, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function FadeRight({ children, delay = 0, className, style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={view}
      transition={{ duration: 0.62, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function ZoomIn({ children, delay = 0, className, style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={view}
      transition={{ duration: 0.55, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
