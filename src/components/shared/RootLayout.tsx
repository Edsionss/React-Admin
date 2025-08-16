// src/components/shared/RootLayout.tsx
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function RootLayout() {
  return (
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Header />
        <main className='flex-1 p-6'>
          <Outlet /> {/* 子路由会在这里渲染 */}
        </main>
      </div>
    </div>
  )
}