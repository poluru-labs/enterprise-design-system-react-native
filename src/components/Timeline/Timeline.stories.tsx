import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  args: {
    items: [
      { id: '1', title: 'Created', description: 'Project started', timestamp: 'Mon' },
      { id: '2', title: 'Reviewed', description: 'Design approved', timestamp: 'Wed' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {};
