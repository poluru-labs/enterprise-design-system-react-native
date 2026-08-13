import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  args: {
    label: 'Settings',
    icon: 'settings',
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {};
