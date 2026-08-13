import type { Meta, StoryObj } from '@storybook/react';
import { SplitButton } from './SplitButton';

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  args: {
    label: 'Save',
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof SplitButton>;

export const Default: Story = {};
