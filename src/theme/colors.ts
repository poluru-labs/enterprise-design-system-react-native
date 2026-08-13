import { color } from '../tokens/tokens';

export type EdsSemanticColors = {
  bg: string;
  surface: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  textInverse: string;
  focus: string;
  primary: string;
  primaryHover: string;
  primaryActive: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  danger: string;
  dangerSoft: string;
  info: string;
  infoSoft: string;
  brandSoft: string;
  overlay: string;
};

/** Semantic colors for light theme (parity with WC `:root`). */
export const lightSemantic: EdsSemanticColors = {
  bg: color.ink[50],
  surface: color.white,
  border: color.ink[200],
  borderStrong: color.ink[300],
  text: color.ink[900],
  textMuted: color.ink[600],
  textSubtle: color.ink[500],
  textInverse: color.white,
  focus: color.brand[600],
  primary: color.brand[700],
  primaryHover: color.brand[800],
  primaryActive: color.brand[900],
  success: color.success[600],
  successSoft: color.success[100],
  warning: color.warning[600],
  warningSoft: color.warning[100],
  danger: color.danger[600],
  dangerSoft: color.danger[100],
  info: color.info[600],
  infoSoft: color.info[100],
  brandSoft: color.brand[100],
  overlay: 'rgba(15, 23, 32, 0.45)',
};

/** Semantic colors for dark theme (parity with WC `.eds-theme-dark`). */
export const darkSemantic: EdsSemanticColors = {
  bg: '#0c1219',
  surface: '#151d27',
  border: color.ink[800],
  borderStrong: color.ink[700],
  text: color.ink[100],
  textMuted: color.ink[400],
  textSubtle: color.ink[500],
  textInverse: color.ink[950],
  focus: color.brand[400],
  primary: color.brand[400],
  primaryHover: color.brand[300],
  primaryActive: color.brand[500],
  success: color.success[600],
  successSoft: 'rgba(31, 122, 77, 0.2)',
  warning: color.warning[600],
  warningSoft: 'rgba(154, 103, 0, 0.22)',
  danger: color.danger[600],
  dangerSoft: 'rgba(180, 35, 24, 0.22)',
  info: color.info[600],
  infoSoft: 'rgba(23, 92, 211, 0.22)',
  brandSoft: 'rgba(26, 155, 149, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.55)',
};
