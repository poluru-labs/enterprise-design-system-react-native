import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Group: Story = {
  render: function Render() {
    const [value, setValue] = useState('pro');
    return (
      <RadioGroup
        label="Plan"
        value={value}
        onValueChange={setValue}
        options={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
      />
    );
  },
};
