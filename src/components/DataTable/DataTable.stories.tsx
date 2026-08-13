import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'role', header: 'Role' },
    ],
    rows: [
      { name: 'Alex', role: 'Admin' },
      { name: 'Sam', role: 'Editor' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {};
