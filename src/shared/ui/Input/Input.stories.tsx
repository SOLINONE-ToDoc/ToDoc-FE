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
    allowToggle: true,
    fullWidth: true,
  },
};
