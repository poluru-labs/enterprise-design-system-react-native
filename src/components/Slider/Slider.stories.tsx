import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    label: 'Volume',
    value: 40,
    min: 0,
    max: 100,
    showValue: true,
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};
