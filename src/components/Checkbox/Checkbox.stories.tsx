import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Accept terms',
    checked: true,
  },
  render: controlledRender(Checkbox, {
    valueKey: 'checked',
    onChangeKey: 'onCheckedChange',
  }),
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
