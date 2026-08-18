import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
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
  render: function Render(args) {
    const [, setArgs] = useArgs();
    return (
      <TreeView
        {...args}
        onToggle={(id, expanded) => {
          args.onToggle?.(id, expanded);
          const current = args.expandedIds ?? [];
          setArgs({
            expandedIds: expanded
              ? [...current, id]
              : current.filter((item) => item !== id),
          });
        }}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {};
