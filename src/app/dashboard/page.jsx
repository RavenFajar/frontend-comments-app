'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

export default function DashboardPage() {
  const router = useRouter()
  const [comments, setComments] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/login')
    } else {
      fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
        .then(data => setComments(data.slice(0, 50))) // batas 50 data
    }
  }, [])

  const handleDelete = (id) => {
    setComments(prev => prev.filter(comment => comment.id !== id))
  }

  const actionBodyTemplate = (rowData) => (
    <Button icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(rowData.id)} />
  )

  return (
    <div className="container mt-4">
      <h2>Data Komentar</h2>

      <div className="mb-3">
        <InputText placeholder="Search..." onChange={(e) => setGlobalFilter(e.target.value)} />
      </div>

      <DataTable value={comments} paginator rows={10} globalFilter={globalFilter}>
        <Column field="name" header="Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="body" header="Comment" />
        <Column body={actionBodyTemplate} header="Delete" />
      </DataTable>

      <div className="mt-4">
        <Button label="Create Comment" icon="pi pi-plus" className="p-button-success" onClick={() => router.push('/create-comment')} />
      </div>
    </div>
  )
}
