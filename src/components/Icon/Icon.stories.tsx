import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'settings',
    size: 'lg',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Plus: Story = { args: { name: 'plus' } };
export const Search: Story = { args: { name: 'search' } };
