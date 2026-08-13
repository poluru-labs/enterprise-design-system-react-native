import type { Decorator } from '@storybook/react';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { ThemeProvider, type EdsTheme } from '../src/theme';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;
initializeThemeState(['light', 'dark'], 'light');

export const withEdsTheme: Decorator = (Story, context) => {
  const selected = pluckThemeFromContext(context as never) as EdsTheme;
  const override = (context.parameters.themes as { themeOverride?: EdsTheme } | undefined)
    ?.themeOverride;
  const theme: EdsTheme = override || selected || 'light';
  const isDark = theme === 'dark';

  return (
    <ThemeProvider theme={theme}>
      <div
        data-eds-theme={theme}
        style={{
          minHeight: '100%',
          boxSizing: 'border-box',
          padding: 16,
          background: isDark ? '#0c1219' : '#f4f6f8',
          color: isDark ? '#e8edf2' : '#1a2430',
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        <Story />
      </div>
    </ThemeProvider>
  );
};
