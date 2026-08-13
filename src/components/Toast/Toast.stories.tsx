import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ToastProvider, showToast } from './Toast';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Button onPress={() => showToast({ title: 'Saved', description: 'Changes applied.', variant: 'success' })}>
        Show toast
      </Button>
    </ToastProvider>
  ),
};
