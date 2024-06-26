import { create } from 'zustand';

interface UserInfo {
  id?: string;
  username?: string;
  email?: string;
  permission_id?: string;
  token?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  token: string | null;
  login: (token: string, userInfo: UserInfo) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => {
  const storedToken = localStorage.getItem('authToken');
  const storedUserInfo = localStorage.getItem('userInfo');
  let initialUserInfo: UserInfo = {};
  try {
    if (storedUserInfo) {
      initialUserInfo = JSON.parse(storedUserInfo);
    }
  } catch (error) {
    console.error("Error parsing JSON userInfo:", error);
  }

  const isLoggedIn = !!storedToken;

  return {
    isLoggedIn,
    userInfo: initialUserInfo,
    token: storedToken,
    login: (token, userInfo) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      set({ isLoggedIn: true, userInfo, token });
    },
    logout: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      set({ isLoggedIn: false, userInfo: {}, token: null });
    },
  };
});

export default useAuthStore;
