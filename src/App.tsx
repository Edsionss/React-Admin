// src/App.tsx
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Toaster } from "@/components/ui/sonner" // 用于全局通知  
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
export default App