import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button } from '../Button';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onPress={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onOpenChange={setOpen} heading="Confirm" footer={<Button onPress={() => setOpen(false)}>Done</Button>}>
          <Text>Modal body content</Text>
        </Modal>
      </>
    );
  },
};
