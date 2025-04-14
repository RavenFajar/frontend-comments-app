'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreateComment() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/login')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !body) return setError('Semua field wajib diisi.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Email tidak valid.')

    console.log('Komentar dikirim:', { name, email, body })
    router.push('/dashboard')
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Buat Komentar</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nama</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Komentar</label>
          <textarea className="form-control" rows="4" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <button className="btn btn-success w-100">Submit</button>
      </form>
    </div>
  )
}
