import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippet } from './CodeSnippet';

const meta: Meta<typeof CodeSnippet> = {
  title: 'Components/CodeSnippet',
  component: CodeSnippet,
  tags: ['autodocs'],
  args: {
    code: "const hello = 'world';",
    language: 'ts',
    copyable: true,
  },
};

export default meta;
type Story = StoryObj<typeof CodeSnippet>;

export const Default: Story = {};
