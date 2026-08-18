import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
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
  render: controlledRender(Autocomplete, { onChangeKey: 'onChangeText' }),
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {};
