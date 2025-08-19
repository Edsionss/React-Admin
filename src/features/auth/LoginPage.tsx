// src/features/auth/LoginPage.tsx

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useAuthStore } from '@/store/authStore' // 假设你已经创建了这个 store

// 1. 定义 Zod 校验 Schema
const formSchema = z.object({
  email: z.string().email({
    message: '请输入有效的邮箱地址',
  }),
  password: z.string().min(6, {
    message: '密码长度不能少于6位',
  }),
})

// 模拟 API 请求函数
// 在真实项目中，这里应该调用你封装的 apiClient
const loginApi = async (data: z.infer<typeof formSchema>) => {
  console.log('Sending login request:', data)
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 模拟成功或失败的响应
  if (data.email === 'admin@example.com' && data.password === 'password') {
    return {
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
      },
      token: 'fake-jwt-token-for-demonstration',
    }
  } else {
    throw new Error('邮箱或密码错误')
  }
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const loginAction = useAuthStore((state) => state.login)

  // 2. 初始化 React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 3. 使用 TanStack Query 的 useMutation 处理异步提交
  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 登录成功
      loginAction(data.user, data.token) // 更新 Zustand store
      toast({
        title: '登录成功',
        description: `欢迎回来, ${data.user.name}!`,
      })
      navigate('/') // 跳转到主页
    },
    onError: (error) => {
      // 登录失败
      toast({
        title: '登录失败',
        description: error.message || '发生未知错误',
        variant: 'destructive',
      })
    },
  })

  // 4. 定义表单提交处理函数
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950'>
      <Card className='mx-auto w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>登录</CardTitle>
          <CardDescription>请输入您的凭据以访问您的账户</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* 邮箱字段 */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='m@example.com'
                        {...field}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 密码字段 */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='******'
                        {...field}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 提交按钮 */}
              <Button
                type='submit'
                className='w-full'
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    登录中...
                  </>
                ) : (
                  '登录'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
export default Login
