import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { PinInput } from './PinInput';

const meta: Meta<typeof PinInput> = {
  title: 'Components/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  args: {
    label: 'One-time code',
    length: 4,
    value: '',
  },
  render: controlledRender(PinInput, { onChangeKey: 'onChange' }),
};

export default meta;
type Story = StoryObj<typeof PinInput>;

export const Default: Story = {};
