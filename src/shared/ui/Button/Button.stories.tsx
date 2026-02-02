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

export const FindId: Story = {
  args: {
    variant: 'text',
    size: 'text',
    children: '아이디 찾기',
  },
};

export const FindPassword: Story = {
  args: {
    variant: 'text',
    size: 'text',
    children: '비밀번호 찾기',
  },
};

export const SignUp: Story = {
  args: {
    variant: 'text',
    size: 'text',
    children: '회원가입하기',
  },
};
