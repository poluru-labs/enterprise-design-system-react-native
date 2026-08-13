import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    label: 'New',
    variant: 'brand',
    soft: true,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Solid: Story = { args: { soft: false } };
export const Pill: Story = { args: { pill: true } };
export const Success: Story = { args: { variant: 'success', label: 'Active' } };
