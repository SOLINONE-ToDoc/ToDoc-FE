import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Note } from './Note';

const meta: Meta<typeof Note> = {
  title: 'Shared/Ui/Note',
  component: Note,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    rotation: {
      control: 'radio',
      options: ['left', 'right', 'none'],
    },
    isSelected: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-10 flex justify-center items-center bg-gray-100 min-h-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Note>;

export const Default: Story = {
  args: {
    content: '사이즈, 회전 테스트',
    date: '26.02.06 16:00',
    size: 'sm',
    rotation: 'none',
    baseZIndex: 1,
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <Note
        content="Small Note" date="26.02.06 16:00" size="sm" baseZIndex={1}
      />
      <Note
        content="Medium Note" date="26.02.06 16:00" size="md" baseZIndex={1}
      />
      <Note
        content="Large Note" date="26.02.06 16:00" size="lg" baseZIndex={1}
      />
      <Note
        content="Extra Large Note" date="26.02.06 16:00" size="xl" baseZIndex={1}
      />
    </div>
  ),
};

export const ZIndexInteraction: Story = {
  render: () => {
    const NoteContainer: React.FC = () => {
      const [selectedId, setSelectedId] = useState<number | null>(null);
      const notes = [
        { id: 1, content: '첫 번째 노트', x: 0 },
        { id: 2, content: '두 번째 노트', x: 100 },
        { id: 3, content: '세 번째 노트', x: 200 },
      ];

      return (
        <div className="relative h-[400px] w-full bg-gray-200 p-10">
          {notes.map((note) => {
            const isSelected = selectedId === note.id;
            const zIndex = isSelected ? note.id + 1000 : note.id;

            return (
              <div
                key={note.id}
                className="absolute transition-all duration-300"
                style={{ left: note.x, top: note.id * 40, zIndex }}
              >
                <Note
                  content={note.content}
                  date="26.02.06 16:00"
                  baseZIndex={note.id}
                  isSelected={isSelected}
                  onClick={() => setSelectedId(isSelected ? null : note.id)}
                />
              </div>
            );
          })}
        </div>
      );
    };

    return <NoteContainer />;
  },
};
