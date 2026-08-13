import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    title: 'No results',
    description: 'Try adjusting your filters.',
    icon: 'search',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
