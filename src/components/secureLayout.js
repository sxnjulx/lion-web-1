import React, { useEffect, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Outlet } from 'react-router-dom';
import { ReactComponent as MyLogo } from '../resources/images/logo.svg';
import { useServices } from '../services/ServiceContext';

const navigation = [
  { name: 'Home', routeTo: '/home' },
  { name: 'Blogs', routeTo: '/blogs' },
  { name: 'Project', routeTo: '/project' },
  { name: 'Meet Our Team', routeTo: '/team' },
  { name: 'About Us', routeTo: '/aboutus' },
  { name: 'Contact', routeTo: '/contact' },
];

export default function SecureLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userStateService} = useServices()
  const {state, dispatch} = userStateService

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <MyLogo className="h-8 w-auto" />
          </a>
        </div>
        <nav className="flex-1">
          <ul>
            {navigation.map((item, index) => (
              <li key={index} className="mb-4">
                <NavLink
                  to={item.routeTo}
                  className={({ isActive }) =>
                    [
                      isActive ? 'font-bold text-indigo-600' : '',
                      'text-sm font-semibold leading-6 text-white hover:text-indigo-400',
                    ].join(' ')
                  }
                  onClick={handleCloseMobileMenu}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          Authenticated Status: {state.IS_USER_AUTHENTICATED}
        </div>
        <div className="mt-auto">
          <a href="/login" className="text-sm font-semibold leading-6 text-white">
            {state.IS_USER_AUTHENTICATED ? 'Log Out' : 'Log In'} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="lg:hidden bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <MyLogo className="h-8 w-auto" />
            </a>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={handleCloseMobileMenu}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <MyLogo className="h-8 w-auto" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={handleCloseMobileMenu}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.routeTo}
                      className={({ isActive }) =>
                        [
                          isActive ? 'font-bold text-indigo-600' : '',
                          '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50',
                        ].join(' ')
                      }
                      onClick={handleCloseMobileMenu}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>

        {/* Main Content */}
        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
