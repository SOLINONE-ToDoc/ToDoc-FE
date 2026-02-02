import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Pages/Login/LoginForm',
  component: LoginForm,
  args: {
    formData: { email: '', password: '' },
    onChange: () => {},
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
