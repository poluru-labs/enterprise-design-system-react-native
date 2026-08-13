import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { MenuItem } from '../MenuItem';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <DropdownMenu
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button iconTrailing="chevron-down">Actions</Button>
        }
      >
        <MenuItem label="Edit" icon="edit" onPress={() => setOpen(false)} />
        <MenuItem label="Delete" icon="trash" destructive onPress={() => setOpen(false)} />
      </DropdownMenu>
    );
  },
};
