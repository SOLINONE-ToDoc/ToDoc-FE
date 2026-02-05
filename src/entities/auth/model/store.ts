import { create } from 'zustand';
import Cookies from 'js-cookie';
import type { AuthState } from './types';

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get('accessToken') || null,
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')!) : null,

  setAuth: (token, userInfo, expiresIn) => {
    const expiryDays = expiresIn / 86400;

    Cookies.set('accessToken', token, {
      expires: expiryDays,
      secure: true,
      sameSite: 'strict'
    });
    Cookies.set('userInfo', JSON.stringify(userInfo), {
      expires: expiryDays
    });

    set({ accessToken: token, userInfo });
  },

  clearAuth: () => {
    Cookies.remove('accessToken');
    Cookies.remove('userInfo');

    set({ accessToken: null, userInfo: null });
  },
}));
