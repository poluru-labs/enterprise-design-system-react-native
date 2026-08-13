import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    label: 'Notifications',
    checked: true,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
