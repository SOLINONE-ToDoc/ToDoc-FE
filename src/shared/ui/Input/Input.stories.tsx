import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Ui/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Email: Story = {
  args: {
    type: 'text',
    placeholder: '이메일 아이디를 입력해주세요',
    fullWidth: true,
  },
};

export const EmailWithLabel: Story = {
  args: {
    label: '이메일 아이디',
    labelClassName: 'text-[24px]',
    placeholder: '이메일을 입력해주세요',
    fullWidth: true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    iconType: 'passwordToggle',
    fullWidth: true,
  },
};

export const NicknameRefresh: Story = {
  args: {
    label: '닉네임',
    labelClassName: 'text-body-1 lg:text-[18px]',
    value: '신난 굴림체',
    readOnly: true,
    iconType: 'refresh',
    fullWidth: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: '비밀번호 확인',
    labelClassName: 'lg:text-[24px]',
    type: 'password',
    value: '1234',
    error: true,
    helperText: '비밀번호가 일치하지 않습니다.',
    fullWidth: true,
  },
};
