import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: {
    label: 'Design',
    variant: 'brand',
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {};
