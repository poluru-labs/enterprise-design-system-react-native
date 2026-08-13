import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: {
    label: 'or',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
