// store/authStore.ts
import {create} from 'zustand';
interface AuthState {
  isLoggedIn: boolean;
  userInfo: {
    id? : string;
    username?: string;
    email?: string;
    permission_id?: string
    token?: string
    // ...các thông tin khác
  };
  login: (userInfo: AuthState['userInfo']) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userInfo: {},
  login: (userInfo) => set({ isLoggedIn: true, userInfo }),
  logout: () => set({ isLoggedIn: false, userInfo: {} }),
}));

export default useAuthStore;
