import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    name: 'Alex Rivera',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = { args: { initials: 'AR' } };
export const Large: Story = { args: { size: 'xl' } };
