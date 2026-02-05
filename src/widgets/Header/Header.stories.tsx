import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Shared/Ui/Header',
  component: Header,
  parameters: {
  },
  decorators: [
    (Story) => (
      <div className="fullscreen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const HeaderStory: Story = {
  parameters: {
    layout: 'fullscreen',
  },
};
