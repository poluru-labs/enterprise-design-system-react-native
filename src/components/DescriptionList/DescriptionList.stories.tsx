import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionList } from './DescriptionList';

const meta: Meta<typeof DescriptionList> = {
  title: 'Components/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  args: {
    items: [
      { term: 'Name', description: 'Enterprise Design Systems' },
      { term: 'Owner', description: 'Poluru Labs' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const Default: Story = {};
