import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { TimePicker } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  args: {
    label: 'Start time',
    value: '09:30',
  },
  render: controlledRender(TimePicker, { onChangeKey: 'onChange' }),
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {};
