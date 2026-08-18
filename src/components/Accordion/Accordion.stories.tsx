import type { Meta, StoryObj } from '@storybook/react';
import { controlledRender } from '../../../.storybook/controlled';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    type: 'single',
    value: 'a',
    items: [
      { id: 'a', title: 'What is EDS?', content: 'Enterprise Design Systems for React Native.' },
      { id: 'b', title: 'Themes', content: 'Light and dark semantic tokens.' },
    ],
  },
  render: controlledRender(Accordion),
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {};
