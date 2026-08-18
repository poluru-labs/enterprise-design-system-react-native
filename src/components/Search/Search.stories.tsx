import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { Search } from './Search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search…',
    value: '',
  },
  render: controlledRender(Search, { onChangeKey: 'onChangeText' }),
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {};
