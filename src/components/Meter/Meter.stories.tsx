import type { Meta, StoryObj } from '@storybook/react';
import { Meter } from './Meter';

const meta: Meta<typeof Meter> = {
  title: 'Components/Meter',
  component: Meter,
  tags: ['autodocs'],
  args: {
    value: 40,
    min: 0,
    max: 100,
    label: 'Storage',
  },
};

export default meta;
type Story = StoryObj<typeof Meter>;

export const Default: Story = {};
