import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    variant: 'info',
    title: 'Heads up',
    message: 'Your changes were saved.',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {};
export const Success: Story = { args: { variant: 'success', title: 'Done' } };
export const Warning: Story = { args: { variant: 'warning', title: 'Careful' } };
export const Danger: Story = { args: { variant: 'danger', title: 'Error' } };
export const Dismissible: Story = { args: { dismissible: true } };
