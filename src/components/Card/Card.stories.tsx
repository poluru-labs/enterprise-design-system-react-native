import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    elevated: true,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} header={<Text>Card title</Text>} footer={<Text>Footer</Text>}>
      <Text>Card body content</Text>
    </Card>
  ),
};
