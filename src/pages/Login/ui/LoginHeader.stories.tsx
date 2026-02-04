import type { Meta, StoryObj } from '@storybook/react';
import { LoginHeader } from './LoginHeader';

const meta: Meta<typeof LoginHeader> = {
  title: 'Features/Auth/LoginHeader',
  component: LoginHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginHeader>;

export const Default: Story = {
  render: () => (
    <div className="w-[375px] bg-white p-4">
      <LoginHeader />
    </div>
  ),
};
