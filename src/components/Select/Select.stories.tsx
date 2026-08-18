import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Country',
    placeholder: 'Select…',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
    ],
    value: 'us',
  },
  render: controlledRender(Select),
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
