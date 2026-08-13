import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  args: {
    items: [
      { id: '1', label: 'Inbox', description: '12 unread', icon: 'mail' },
      { id: '2', label: 'Settings', icon: 'settings' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {};
