import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {
    value: '2026-07-22',
    label: 'Start date',
    onChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};
