import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { AuthContext } from '../context/auth-context';

const NavLink = () => {
    const auth = useContext(AuthContext);

    return (
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {!auth.isLoggedIn && (
                <Fragment>
                    <Link
                        to={'/auth/login'}
                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                        로그인
                    </Link>
                    <Link
                        to={'/auth/join'}
                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                        회원가입
                    </Link>
                </Fragment>
            )}
            {auth.isLoggedIn && (
                <Fragment>
                    <a
						href="#"
                        onClick={auth.logout}
                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                        로그아웃
                    </a>
                </Fragment>
            )}
        </div>
    );
};

export default NavLink;