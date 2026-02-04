import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    config.plugins?.push(
      svgr({
        svgrOptions: {
          icon: true,
        },
      })
    );

    config.define = {
      ...config.define,
      'process.env.VITE_KAKAO_MAP_KEY': JSON.stringify(process.env.VITE_KAKAO_MAP_KEY),
    };

    return config;
  },
};
export default config;
