import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: {
    activeIndex: 1,
    steps: [
      { id: '1', label: 'Account' },
      { id: '2', label: 'Profile' },
      { id: '3', label: 'Done' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};
