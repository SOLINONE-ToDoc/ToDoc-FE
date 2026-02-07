import type { Meta, StoryObj } from '@storybook/react';
import { MapPreview } from './MapPreview';
import type { Coords } from '@/entities/map';

const meta: Meta<typeof MapPreview> = {
  title: 'Pages/Map/MapPreview',
  component: MapPreview,
};

export default meta;
type Story = StoryObj<typeof MapPreview>;

const exampleCoords: Coords = {
  lat: 37.561478,
  lng: 126.985707,
};

export const Default: Story = {
  args: {
    coords: exampleCoords,
  },
};
