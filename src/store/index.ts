import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface EditorState {
  content: string;
  language: string;
  user: User;
  setContent: (content: string) => void;
  setLanguage: (language: string) => void;
  setUser: (user: User) => void;
}

export const useStore = create<EditorState>((set) => ({
  content: '',
  language: 'javascript',
  user: {
    id: 'default-user',
    name: 'Anonymous',
    email: 'anonymous@example.com',
  },
  setContent: (content) => set({ content }),
  setLanguage: (language) => set({ language }),
  setUser: (user) => set({ user }),
}));