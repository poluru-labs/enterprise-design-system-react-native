import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Continue',
    variant: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const WithIcon: Story = { args: { icon: 'plus', children: 'Add item' } };
export const IconOnly: Story = {
  args: { icon: 'settings', iconOnly: true, accessibleLabel: 'Settings' },
};
export const Loading: Story = { args: { loading: true } };
export const Danger: Story = { args: { variant: 'danger', children: 'Delete' } };
