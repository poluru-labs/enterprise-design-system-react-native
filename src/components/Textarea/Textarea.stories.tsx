import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
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
  render: controlledRender(Textarea, { onChangeKey: 'onChangeText' }),
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
