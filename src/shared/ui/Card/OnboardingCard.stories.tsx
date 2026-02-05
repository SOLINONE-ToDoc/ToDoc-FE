import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingCard } from './OnboardingCard';

const meta: Meta<typeof OnboardingCard> = {
  title: 'Widgets/OnboardingCard',
  component: OnboardingCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-10 bg-gray-50 min-h-screen flex justify-center items-start">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    number: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingCard>;

export const Default: Story = {
  args: {
    number: '01',
    title: '분위기에 알맞는 방명록',
    description: '당신의 취향을 분석하여 가장 잘 어울리는 폰트를 추천해 드립니다.',
    illustration: (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <span className="text-gray-500 font-bold text-xl">500x500</span>
      </div>
    ),
  },
};
