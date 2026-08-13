import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'you@company.com',
    icon: 'mail',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Enter a valid email', value: 'bad' },
};
export const WithHint: Story = { args: { hint: 'We never share your email.' } };
