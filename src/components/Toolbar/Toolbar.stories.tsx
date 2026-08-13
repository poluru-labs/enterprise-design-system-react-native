import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Toolbar } from './Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => (
    <Toolbar>
      <Button size="sm" variant="tertiary" icon="filter" iconOnly accessibleLabel="Filter" />
      <Button size="sm" variant="tertiary" icon="search" iconOnly accessibleLabel="Search" />
      <Button size="sm">Save</Button>
    </Toolbar>
  ),
};
