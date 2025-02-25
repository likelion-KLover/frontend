import { create, StateCreator } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  error: string | null;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  error: null,
  setUser: (user: User | null) => set({ user }),
  setError: (error) => set({ error }),
});

const useAuthStore = create<AuthState>()((...a) => ({
  ...createAuthSlice(...a),
  // ...createAnotherStoreSlice(...a),
}));

export default useAuthStore;
