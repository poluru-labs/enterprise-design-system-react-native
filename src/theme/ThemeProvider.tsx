import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { spacing, radius, typography, color, motion } from '../tokens/tokens';
import { darkSemantic, lightSemantic, type EdsSemanticColors } from './colors';

export type EdsTheme = 'light' | 'dark';

export type EdsThemeValue = {
  theme: EdsTheme;
  setTheme: (theme: EdsTheme) => void;
  toggleTheme: () => void;
  colors: EdsSemanticColors;
  palette: typeof color;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  motion: typeof motion;
};

const ThemeContext = createContext<EdsThemeValue | null>(null);

export type ThemeProviderProps = {
  theme?: EdsTheme;
  defaultTheme?: EdsTheme;
  children: ReactNode;
};

/**
 * Provides light/dark semantic tokens for React Native (parity with WC `eds-theme-dark`).
 */
export function ThemeProvider({
  theme: controlledTheme,
  defaultTheme = 'light',
  children,
}: ThemeProviderProps) {
  const [uncontrolled, setUncontrolled] = useState<EdsTheme>(defaultTheme);
  const theme = controlledTheme ?? uncontrolled;

  const setTheme = useCallback(
    (next: EdsTheme) => {
      if (controlledTheme === undefined) setUncontrolled(next);
    },
    [controlledTheme],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  const value = useMemo<EdsThemeValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      colors: theme === 'dark' ? darkSemantic : lightSemantic,
      palette: color,
      spacing,
      radius,
      typography,
      motion,
    }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): EdsThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

/** Optional theme — falls back to light tokens outside a provider. */
export function useOptionalTheme(): EdsThemeValue {
  const ctx = useContext(ThemeContext);
  return (
    ctx ?? {
      theme: 'light',
      setTheme: () => undefined,
      toggleTheme: () => undefined,
      colors: lightSemantic,
      palette: color,
      spacing,
      radius,
      typography,
      motion,
    }
  );
}

export const EdsThemeProvider = ThemeProvider;
