import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userInfo: {
    id?: string;
    username?: string;
    email?: string;
    permission_id?: string;
    token?: string;
    // ...các thông tin khác
  };
  token: string | null;
  login: (token: string, userInfo: AuthState['userInfo']) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const storedToken = localStorage.getItem('authToken');
  const storedUserInfo = localStorage.getItem('userInfo');
  let initialUserInfo = {};
  try {
    if (storedUserInfo) { // Kiểm tra xem storedUserInfo có giá trị hay không
      initialUserInfo = JSON.parse(storedUserInfo);
    }
  } catch (error) {
    console.error("Lỗi khi phân tích JSON userInfo:", error);
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

// store/authStore.ts
// store/authStore.ts
