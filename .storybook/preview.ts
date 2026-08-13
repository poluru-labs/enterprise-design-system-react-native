import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { withEdsTheme } from './withEdsTheme';

const preview: Preview = {
  decorators: [withEdsTheme],
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*|.*Change|onPress' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      theme: themes.light,
      toc: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          'Foundations',
          ['Icons', 'Themes'],
          'Components',
        ],
      },
    },
    layout: 'centered',
    backgrounds: {
      disable: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
