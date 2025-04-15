'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import Navbar from '@/components/Navbar'


export default function DashboardPage() {
  const router = useRouter()
  const toastRef = useRef(null)

  const [comments, setComments] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      setTimeout(() => router.push('/login'), 500)
      return
    }

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => setComments(data.slice(0, 50)))
      .catch(err => console.error(err))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    toastRef.current.show({ severity: 'success', summary: 'Logout Sukses', detail: 'Anda berhasil logout' })
    setTimeout(() => router.push('/login'), 1500)
  }

  const handleDelete = (id) => {
    setComments(prev => prev.filter(comment => comment.id !== id))
    toastRef.current.show({ severity: 'success', summary: 'Sukses', detail: 'Komentar berhasil dihapus' })
  }

  const confirmDelete = (id) => {
    confirmDialog({
      message: 'Apakah Anda yakin ingin menghapus komentar ini?',
      header: 'Konfirmasi Hapus',
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleDelete(id),
      acceptLabel: 'Ya',
      rejectLabel: 'Tidak',
      acceptClassName: 'p-button-sm p-button-danger',
      rejectClassName: 'p-button-sm p-button-secondary',
    })
  }

  const actionBodyTemplate = (rowData) => (
    <Button icon="pi pi-trash" className="p-button-danger" onClick={() => confirmDelete(rowData.id)} />
  )

  return (
    <>
      <Toast ref={toastRef} />
      <ConfirmDialog
        className="w-[420px] sm:w-[500px] rounded-lg shadow-lg"
        pt={{
          root: { className: 'rounded-lg' },
          content: { className: 'px-6 py-4' },
          footer: { className: 'px-6 pb-4 pt-2 flex justify-end gap-3 flex-wrap' },
          message: { className: 'text-gray-700' },
        }}
      />

      <div className="min-h-full">
        <Navbar onLogout={handleLogout} />

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="p-inputgroup mb-4">
              <InputText placeholder="Keyword" onChange={(e) => setGlobalFilter(e.target.value)} />
              <Button icon="pi pi-search" className="p-button-warning" />
            </div>
            {/* Mobile Card View */}
            <div className="hidden max-[580px]:block space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1"><strong>Name:</strong> {comment.name}</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {comment.email}</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Comment:</strong> {comment.body}</p>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-sm p-button-danger"
                    onClick={() => confirmDelete(comment.id)}
                  />
                </div>
              ))}
            </div>
            {/* Desktop Table View */}
            <div className="block max-[580px]:hidden">
              <DataTable value={comments} paginator rows={10} globalFilter={globalFilter}>
                <Column field="name" header="Name" sortable />
                <Column field="email" header="Email" sortable />
                <Column field="body" header="Comment" />
                <Column body={actionBodyTemplate} header="Delete" />
              </DataTable>
            </div>

            {/* 
            <DataTable value={comments} paginator rows={10} globalFilter={globalFilter}>
              <Column field="name" header="Name" sortable />
              <Column field="email" header="Email" sortable />
              <Column field="body" header="Comment" />
              <Column body={actionBodyTemplate} header="Delete" />
            </DataTable> */}

            <div className="mt-4">
              <Button
                label="Create Comment"
                icon="pi pi-plus"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => router.push('/create-comment')}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
