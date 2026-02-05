import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Shared/Ui/Footer',
  component: Footer,
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
type Story = StoryObj<typeof Footer>;

export const Desktop: Story = {};
