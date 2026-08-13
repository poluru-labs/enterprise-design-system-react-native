import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button } from '../Button';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onPress={() => setOpen(true)}>Open drawer</Button>
        <Drawer open={open} onOpenChange={setOpen} heading="Filters" side="right">
          <Text>Drawer content</Text>
        </Drawer>
      </>
    );
  },
};
