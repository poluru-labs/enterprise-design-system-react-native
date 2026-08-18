import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    label: 'Notifications',
    checked: true,
  },
  render: controlledRender(Switch, {
    valueKey: 'checked',
    onChangeKey: 'onCheckedChange',
  }),
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
