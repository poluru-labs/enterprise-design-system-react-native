import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  args: {
    value: 'day',
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ],
  },
  render: controlledRender(SegmentedControl),
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {};
