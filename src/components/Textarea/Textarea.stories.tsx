import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    label: 'Notes',
    placeholder: 'Write something…',
    value: '',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
