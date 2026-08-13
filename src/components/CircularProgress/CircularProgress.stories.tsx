import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from './CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'Components/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  args: {
    value: 72,
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {};
