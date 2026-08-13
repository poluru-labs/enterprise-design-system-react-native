import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  args: {
    value: 3,
    max: 5,
    onValueChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {};
