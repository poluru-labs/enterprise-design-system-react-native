import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: {
    label: 'Framework',
    options: [
      { value: 'rn', label: 'React Native' },
      { value: 'expo', label: 'Expo' },
      { value: 'flutter', label: 'Flutter' },
    ],
    value: 'rn',
  },
  render: controlledRender(Combobox),
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {};
