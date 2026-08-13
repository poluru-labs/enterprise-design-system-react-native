import type { Meta, StoryObj } from '@storybook/react';
import { SideNav } from './SideNav';

const meta: Meta<typeof SideNav> = {
  title: 'Components/SideNav',
  component: SideNav,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 'home', label: 'Home', icon: 'home', active: true },
      { id: 'files', label: 'Files', icon: 'folder' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {};
