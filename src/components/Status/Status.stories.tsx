import type { Meta, StoryObj } from '@storybook/react';
import { Status } from './Status';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
  tags: ['autodocs'],
  args: {
    variant: 'success',
    label: 'Healthy',
  },
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = {};
