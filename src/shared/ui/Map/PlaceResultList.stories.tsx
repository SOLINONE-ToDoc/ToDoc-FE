import type { Meta, StoryObj } from '@storybook/react';
import { PlaceResultList } from './PlaceResultList';
import type { KakaoPlaceWithZonecode } from '@/shared/types';

const meta: Meta<typeof PlaceResultList> = {
  title: 'Shared/Ui/PlaceResultList',
  component: PlaceResultList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-gray-100 max-w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PlaceResultList>;

const mockResults: KakaoPlaceWithZonecode[] = [
  {
    id: '1',
    place_name: '토독 신한익스페이스',
    road_address_name: '서울특별시 중구 명동10길 52',
    address_name: '서울 중구 충무로2가 65-4',
    zonecode: '04536',
    x: '37.561539',
    y: '126.985777',
  },
  {
    id: '2',
    place_name: '산돌',
    road_address_name: '서울 성동구 아차산로17길 49',
    address_name: '서울 성동구 성수동2가 280-9',
    zonecode: '04799',
    x: '37.546433',
    y: '127.065249',
  },
];

export const Default: Story = {
  args: {
    results: mockResults,
    onSelect: (place) => console.log('선택된 장소:', place),
  },
};

export const Empty: Story = {
  args: {
    results: [],
    onSelect: () => {},
  },
};
