import type { Meta, StoryObj } from '@storybook/react';
import { MapPreview, type MapPlaceWithMessage } from './MapPreview';
import type { Coords, MapPlace } from '@/entities/map';
import { getRelativeVisitText } from '@/shared/utils';

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

const mockPlaces: MapPlace[] = [
  {
    placeId: 1,
    placeName: "테스트",
    latitude: 37.5615224,
    longitude: 126.9857226,
    contentCount: 1,
    myStatus: 'RECENT',
    myContent: null,
    lastVistedAt: "2026-02-07"
  }
];

const mockPlacesWithMessage: MapPlaceWithMessage[] = mockPlaces.map(place => ({
  ...place,
  visitMessage:
    place.myStatus === 'RECENT'
      ? '최근 방문'
      : place.myStatus === 'VISITED' && place.lastVistedAt
      ? getRelativeVisitText(place.lastVistedAt)
      : '방문 전',
  isSelected: false,
}));

export const Default: Story = {
  args: {
    initialCenter: exampleCoords,
    places: mockPlacesWithMessage,
    onIdle: (coords, level) => console.log('중심 변경:', coords, 'level:', level),
    onMarkerClick: (placeId) => console.log('클릭된 placeId:', placeId),
  },
  render: (args) => (
    <div style={{ width: '100%', height: '600px' }}>
      <MapPreview {...args} />
    </div>
  ),
};
