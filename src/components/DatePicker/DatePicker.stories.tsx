import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {
    value: '2026-07-22',
    label: 'Start date',
  },
  render: controlledRender(DatePicker, { onChangeKey: 'onChange' }),
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};
