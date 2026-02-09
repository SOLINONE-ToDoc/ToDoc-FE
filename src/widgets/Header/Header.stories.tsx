import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'Shared/Ui/Header',
  component: AppHeader,
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
type Story = StoryObj<typeof AppHeader>;

export const HeaderStory: Story = {
  parameters: {
    layout: 'fullscreen',
  },
};
