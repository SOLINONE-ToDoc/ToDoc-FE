import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Colors',
};

export default meta;
type Story = StoryObj;

const bgColors = [
  'bg-white', 'bg-black',
  'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600',
  'bg-surface-base', 'bg-surface-surface', 'bg-surface-primary', 'bg-surface-secondary', 'bg-surface-tooltip', 'bg-surface-input', 'bg-surface-overlay'
];

const borderColors = [
  'border-line-default', 'border-line-strong'
];

const textColors = [
  'text-content-primary', 'text-content-secondaryMain', 'text-content-secondarySub', 'text-content-muted',
  'text-content-navActive', 'text-content-navInactive', 'text-content-placeholder',
  'text-content-success', 'text-content-warning', 'text-content-error'
];

export const AllColors: Story = {
  render: () => (
    <div className="space-y-12 p-8 bg-white text-black">
      <section>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Background & Grayscale</h2>
        <div className="grid grid-cols-2 gap-4">
          {bgColors.map((cls) => (
            <div key={cls} className="flex items-center space-x-4 p-2 border border-gray-100 rounded">
              <div className={`w-16 h-10 rounded border border-gray-200 ${cls}`} />
              <div className="flex flex-col">
                <span className="text-sm font-bold">{cls}</span>
                <span className="text-xs text-gray-400">Tailwind Class</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Border Colors</h2>
        <div className="grid grid-cols-2 gap-4">
          {borderColors.map((cls) => (
            <div key={cls} className="flex items-center space-x-4 p-2">
              <div className={`w-16 h-10 border-4 rounded ${cls}`} />
              <span className="text-sm font-bold">{cls}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Text Colors</h2>
        <div className="grid grid-cols-2 gap-4">
          {textColors.map((cls) => (
            <div key={cls} className="flex items-center space-x-4 p-2 border border-gray-50 rounded">
              <span className={`text-2xl font-black w-16 text-center ${cls}`}>Aa</span>
              <span className="text-sm font-bold">{cls}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
