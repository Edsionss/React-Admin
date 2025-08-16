// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/components/shared/RootLayout'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/features/auth/LoginPage'
import UsersPage from '@/features/users/UsersPage'
import ProtectedRoute from './ProtectedRoute' // 稍后创建

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      // ... 其他路由
    ],
  },
])