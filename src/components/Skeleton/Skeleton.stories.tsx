import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    width: 200,
    height: 16,
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Circle: Story = { args: { circle: true, width: 40, height: 40 } };
