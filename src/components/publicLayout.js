import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ReactComponent as MyLogo } from '../resources/images/logo.svg';
import { useServices } from '../services/ServiceContext';

const navigation = [
  { name: 'Home', routeTo: '/home' },
  { name: 'Blogs', routeTo: '/blogs' },
  { name: 'Project', routeTo: '/project' },
  { name: 'Meet Our Team', routeTo: '/team' },
  { name: 'About Us', routeTo: '/aboutus' },
  { name: 'Contact', routeTo: '/contact' },
  // { name: 'Input Blog', routeTo: '/blogInput' },
];

export default function PublicLayout() {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

  const {userStateService} = useServices();
  const {state, dispatch} = userStateService

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLoginLogout = ()=>{
    if (state.IS_USER_AUTHENTICATED){
      
    }
  }


  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <MyLogo className="h-8 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item, index) => (
              <NavLink
                key={index}
                to={item.routeTo}
                className={({ isActive}) =>
                    [
                      isActive ? "font-bold text-indigo-600" : "",
                      "text-sm font-semibold leading-6 text-gray-900"

                    ].join(" ")
                  }
                onClick={handleCloseMobileMenu} // Close menu on click
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              {state.IS_USER_AUTHENTICATED? "log out": "Log In" } <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
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
                onClick={() => setMobileMenuOpen(false)}
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
                      className={({ isActive}) =>
                        [
                          isActive ? "font-bold text-indigo-600" : "",
                          "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    
                        ].join(" ")
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
      </header>

      <Outlet />
    </div>
  );
}
