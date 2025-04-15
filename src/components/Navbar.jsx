'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ onLogout }) {
  const router = useRouter()
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Create Comment', href: '/create-comment' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    if (onLogout) onLogout()
    setTimeout(() => router.push('/login'), 1500)
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left: Logo & Menu */}
              <div className="flex items-center">
                {/* Mobile menu button */}
                <div className="mr-2 flex md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-4">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Right: User Profile */}
              <div className="flex items-center">
                <Menu as="div" className="relative">
                  <div>
                    <MenuButton className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                    {userNavigation.map((item) =>
                      item.name === 'Sign out' ? (
                        <MenuItem key={item.name}>
                          <button
                            onClick={handleLogout}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </button>
                        </MenuItem>
                      ) : (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      )
                    )}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                )
              })}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
