import type { Meta, StoryObj } from '@storybook/react';
import { Stat } from './Stat';

const meta: Meta<typeof Stat> = {
  title: 'Components/Stat',
  component: Stat,
  tags: ['autodocs'],
  args: {
    label: 'Revenue',
    value: '$128k',
    hint: '+12% MoM',
  },
};

export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {};
