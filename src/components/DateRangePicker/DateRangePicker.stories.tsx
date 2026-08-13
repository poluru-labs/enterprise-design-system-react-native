import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  args: {
    start: '2026-07-01',
    end: '2026-07-22',
    label: 'Range',
    onChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {};
