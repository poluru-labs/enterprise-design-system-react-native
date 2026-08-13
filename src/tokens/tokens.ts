/** Design token values mirrored from WC/React for typed RN consumption (numeric where possible). */

export const color = {
  ink: {
    950: '#0f1720',
    900: '#1a2430',
    800: '#2a3746',
    700: '#3d4d5f',
    600: '#5b6b7c',
    500: '#7a8b9c',
    400: '#9aa8b6',
    300: '#b8c3ce',
    200: '#d7dee7',
    100: '#e8edf2',
    50: '#f4f6f8',
  },
  brand: {
    900: '#084845',
    800: '#0b5a56',
    700: '#0f6e6a',
    600: '#12837e',
    500: '#1a9b95',
    400: '#3db5af',
    300: '#6dcdc8',
    200: '#a6e2df',
    100: '#d4f1ef',
    50: '#eef9f8',
  },
  white: '#ffffff',
  success: { 600: '#1f7a4d', 100: '#d9f2e5' },
  warning: { 600: '#9a6700', 100: '#fff1cc' },
  danger: { 600: '#b42318', 100: '#fce8e6' },
  info: { 600: '#175cd3', 100: '#e0ecff' },
} as const;

/** Base 16px rem → dp */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const radius = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 9999,
} as const;

export const typography = {
  fontFamily: {
    sans: 'System',
    display: 'System',
    mono: 'Courier',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.65,
  },
} as const;

export const motion = {
  duration: {
    fast: 120,
    normal: 200,
    slow: 320,
  },
} as const;

export const tokens = {
  color,
  typography,
  spacing,
  radius,
  motion,
} as const;

export type EdsTokens = typeof tokens;
