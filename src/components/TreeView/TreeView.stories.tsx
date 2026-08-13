import type { Meta, StoryObj } from '@storybook/react';
import { TreeView } from './TreeView';

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  args: {
    nodes: [
      { id: '1', label: 'src', children: [{ id: '1a', label: 'index.ts' }] },
      { id: '2', label: 'docs' },
    ],
    expandedIds: ['1'],
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {};
