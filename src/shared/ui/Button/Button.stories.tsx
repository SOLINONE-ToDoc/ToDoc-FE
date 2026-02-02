import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Ui/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Login: Story = {
  args: {
    variant: 'primary',
    size: 'xl',
    fullWidth: true,
    children: '로그인',
  },
};

export const GuestWrite: Story = {
  args: {
    variant: 'secondary',
    size: 'xl',
    fullWidth: true,
    children: '비회원으로 작성하기',
  },
};
