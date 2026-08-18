import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Text } from 'react-native';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('one');
    return (
      <Tabs
        value={value}
        onValueChange={setValue}
        items={[
          { id: 'one', label: 'Overview' },
          { id: 'two', label: 'Details' },
          { id: 'three', label: 'Activity' },
        ]}
      >
        {(id) => <Text>Panel: {id}</Text>}
      </Tabs>
    );
  },
};
