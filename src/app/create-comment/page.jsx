'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

export default function CreateComment() {
  const router = useRouter()
  const toastRef = useRef(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/login')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    toastRef.current.show({
      severity: 'success',
      summary: 'Logout Sukses',
      detail: 'Anda berhasil logout',
    })
    setTimeout(() => router.push('/login'), 1500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !body) return setError('Semua field wajib diisi.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Email tidak valid.')

    console.log('Komentar dikirim:', { name, email, body })
    
    toastRef.current.show({
      severity: 'success',
      summary: 'Berhasil',
      detail: 'Komentar berhasil ditambahkan!',
    })

    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <div className="min-h-full">
        <Toast ref={toastRef} />
        <Navbar onLogout={handleLogout} />

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tambah Komentar</h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {error && <div className="alert alert-danger text-red-600 mb-4">{error}</div>}

            <form className="w-full max-w-2xl mx-auto" onSubmit={handleSubmit}> 
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  id="email"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="example@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                <input
                  type="text"
                  id="name"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900">Komentar</label>
                <textarea
                  id="body"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  rows="4"
                  required
                  placeholder="Isi Komentar"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button type="button" label="Back" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleBack} />
                <Button type="submit" label="Submit Komentar" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" />
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
