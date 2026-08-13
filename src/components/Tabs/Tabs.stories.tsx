import type { Meta, StoryObj } from '@storybook/react';
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
  render: () => (
    <Tabs
      value="one"
      onValueChange={() => undefined}
      items={[
        { id: 'one', label: 'Overview' },
        { id: 'two', label: 'Details' },
        { id: 'three', label: 'Activity' },
      ]}
    >
      {(id) => <Text>Panel: {id}</Text>}
    </Tabs>
  ),
};
