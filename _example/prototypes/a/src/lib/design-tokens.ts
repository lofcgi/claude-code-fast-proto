export const tokens = {
  colors: {
    brand: "#624AFF",
    brandLight: "#7B66FF",
    lime: "#C4F128",
    bg: "#000000",
    surface: "#141414",
    surfaceHover: "#1A1A1A",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    textMuted: "#666666",
    border: "#222222",
    success: "#22C55E",
    error: "#EF4444",
  },
  radius: {
    pill: "506px",
    card: "24px",
    input: "12px",
    small: "8px",
  },
  motion: {
    spring: { type: "spring" as const, stiffness: 300, damping: 25 },
    springGentle: { type: "spring" as const, stiffness: 200, damping: 20 },
    fadeUp: {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
    },
    stagger: 0.1,
  },
} as const;
