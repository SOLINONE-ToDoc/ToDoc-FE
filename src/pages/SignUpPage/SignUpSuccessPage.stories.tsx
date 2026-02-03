import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { SignUpSuccessPage } from './SignUpSuccessPage';

const meta: Meta<typeof SignUpSuccessPage> = {
  title: 'Pages/Auth/SignUpSuccessPage',
  component: SignUpSuccessPage,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SignUpSuccessPage>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone14',
    },
  },
};
