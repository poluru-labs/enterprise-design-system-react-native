import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  args: {
    label: 'Quantity',
    value: 2,
    min: 0,
    max: 10,
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {};
