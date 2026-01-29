import type { Meta, StoryObj } from '@storybook/react';
import { FONTS, type FontId } from '@/shared/constants/fonts';

const meta: Meta = {
  title: 'Foundations/Typography',
};

export default meta;
type Story = StoryObj;

export const AllFonts: Story = {
  render: () => (
    <div className="space-y-10 p-8">
      {(Object.keys(FONTS) as FontId[]).map((id) => {
        const font = FONTS[id];

        return (
          <div key={id}>
            <h2 className={font.tailwindClass}>{font.label}</h2>
          </div>
        );
      })}
    </div>
  ),
};
