'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast'

export default function LoginPage() {
  const router = useRouter()
  const toastRef = useRef(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      router.push('/dashboard')
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    if (!username || !password) {
      toastRef.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Field is required!',
        life: 2000,
      })
      return
    }

    toastRef.current.show({
      severity: 'success',
      summary: 'Login Berhasil',
      detail: 'Anda berhasil login',
      life: 1500,
    })

    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <>
      <Toast ref={toastRef} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Logo PSN"
            src="/images/logoPsn.jpeg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
