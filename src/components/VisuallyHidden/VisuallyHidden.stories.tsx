import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { VisuallyHidden } from './VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  render: () => (
    <VisuallyHidden>
      <Text>Screen-reader only label</Text>
    </VisuallyHidden>
  ),
};
