import type { Meta, StoryObj } from '@storybook/react';
import { MapPreview } from './MapPreview';

const meta: Meta<typeof MapPreview> = {
  title: 'Shared/Ui/MapPreview',
  component: MapPreview,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px'}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MapPreview>;

export const ShinhanExpace: Story = {
  args: {
    lat: 37.561743,
    lng: 126.985631,
  },
};
