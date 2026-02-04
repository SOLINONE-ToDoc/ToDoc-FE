/// <reference types="vite/client" />

import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';
import { fontLoader } from '../src/shared/lib/fontLoader';

if (typeof window !== 'undefined') {
  const script = document.createElement('script');
  const apiKey = import.meta.env.VITE_KAKAO_MAP_KEY;

  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
  script.async = true;

  script.onload = () => {
    window.kakao.maps.load(() => {
      console.log("카카오 지도 로드 완료!");
    });
  };

  document.head.appendChild(script);
}

fontLoader._loadAll();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
};

export default preview;
