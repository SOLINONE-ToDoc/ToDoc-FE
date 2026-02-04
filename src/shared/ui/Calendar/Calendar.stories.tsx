import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Shared/Ui/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="p-20 flex justify-center items-start min-h-[500px] bg-gray-50">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onSelect: { action: 'selected' },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    value: '',
  },
  render: (args) => (
    <div className="relative w-[300px] h-[40px] border rounded p-2 bg-white">
      <span className="text-gray-400">날짜를 선택하세요</span>
      <Calendar {...args} />
    </div>
  ),
};

export const Interactive = () => {
  const [date, setDate] = useState('2026.02.04');
  return (
    <div className="flex flex-col items-center">

      <div className="relative w-[300px] h-[48px] border-2 border-black rounded-lg flex items-center px-4 bg-white">
        <Calendar
          value={date}
          onSelect={(newDate) => setDate(newDate)}
        />
      </div>
    </div>
  );
};
