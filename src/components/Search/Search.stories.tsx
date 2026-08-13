import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search…',
    value: '',
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {};
