import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    page: 2,
    pageCount: 8,
    onPageChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};
