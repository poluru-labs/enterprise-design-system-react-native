import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button } from '../Button';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Toggle</Button>}
      >
        <Text>Popover content</Text>
      </Popover>
    );
  },
};
