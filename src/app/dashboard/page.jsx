'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardPage() {
  const router = useRouter()
  const toastRef = useRef(null)

  const [comments, setComments] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      setTimeout(() => router.push('/login'), 500) // tunggu sejenak
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
        }} />

      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                      {userNavigation.map(item => (
                        <MenuItem key={item.name}>
                          {item.name === 'Sign out' ? (
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.name}
                            </button>
                          ) : (
                            <a
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>

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

            <DataTable value={comments} paginator rows={10} globalFilter={globalFilter}>
              <Column field="name" header="Name" sortable />
              <Column field="email" header="Email" sortable />
              <Column field="body" header="Comment" />
              <Column body={actionBodyTemplate} header="Delete" />
            </DataTable>

            <div className="mt-4">
              <Button
                label="Create Comment"
                icon="pi pi-plus"
                className="p-button-success"
                onClick={() => router.push('/create-comment')}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
