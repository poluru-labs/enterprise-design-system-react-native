import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    children: 'Learn more',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};
