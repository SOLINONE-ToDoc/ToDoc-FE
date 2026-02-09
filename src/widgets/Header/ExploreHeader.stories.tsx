import type { Meta, StoryObj } from '@storybook/react';
import { ExploreHeader } from './ExploreHeader';

const meta: Meta<typeof ExploreHeader> = {
  title: 'Widgets/ExploreHeader',
  component: ExploreHeader,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="w-screen h-screen bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExploreHeader>;

export const Default: Story = {
  name: 'Default Mobile Header',
};

