import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  args: {
    label: 'City',
    value: '',
    suggestions: ['Austin', 'Atlanta', 'Boston', 'Chicago'],
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {};
