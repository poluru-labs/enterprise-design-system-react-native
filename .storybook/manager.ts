import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Enterprise Design Systems',
    brandUrl: './',
    colorPrimary: '#0f6e6a',
    colorSecondary: '#0f6e6a',
    appBg: '#f4f6f8',
    appContentBg: '#ffffff',
    appBorderColor: '#d7dee7',
    appBorderRadius: 8,
    fontBase: '"Source Sans 3", "Segoe UI", sans-serif',
    fontCode: '"IBM Plex Mono", ui-monospace, monospace',
    textColor: '#1a2430',
    textMutedColor: '#5b6b7c',
    barTextColor: '#3d4d5f',
    barSelectedColor: '#0f6e6a',
    barBg: '#ffffff',
  }),
});
