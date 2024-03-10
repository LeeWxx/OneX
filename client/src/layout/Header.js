import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import NavLink from './NavLink'

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Header = () => {
    return (
        <Disclosure as="nav" className="bg-white w-full shadow absolute z-20">
            {({ open }) => (
                <Fragment>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-between sm:items-stretch">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/">
                                        <img
                                            className="h-fit w-auto mt-3"
                                            src="/asset/logo.png"
                                            alt="Logo"
                                        />
                                    </Link>
                                </div>
                                <NavLink/>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Disclosure>
    );
};

export default Header;