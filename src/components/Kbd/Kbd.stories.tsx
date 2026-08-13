import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: {
    children: '⌘K',
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {};
