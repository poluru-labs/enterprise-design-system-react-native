import type { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '../theme';

export function withTheme(ui: ReactElement, theme: 'light' | 'dark' = 'light'): ReactElement {
  return <ThemeProvider defaultTheme={theme}>{ui}</ThemeProvider>;
}

export type { ReactNode };
