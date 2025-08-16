// src/store/authStore.ts
import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  user: { name: string } | null
  login: (user: { name: string }, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('authToken'),
  user: null, // 可以在应用启动时从 API 获取
  login: (user, token) => {
    localStorage.setItem('authToken', token)
    set({ isAuthenticated: true, user })
  },
  logout: () => {
    localStorage.removeItem('authToken')
    set({ isAuthenticated: false, user: null })
  },
}))