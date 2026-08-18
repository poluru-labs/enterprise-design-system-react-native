import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  args: {
    value: 3,
    max: 5,
  },
  render: controlledRender(Rating),
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {};
