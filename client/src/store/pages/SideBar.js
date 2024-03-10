import React, { useContext } from 'react';
import classNames from 'classnames';

import StoreList from '../components/StoreList';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';

const SideBar = ({ data }) => {
    const auth = useContext(AuthContext);

    return (
        <div className="flex grow flex-col gap-y-2 overflow-y-auto border-r border-gray-200 bg-gray-100 mt-32">
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li className="h-full flex justify-between flex-col">
                        <StoreList data={data} />
                        <Link to={'/stores/new'}>
                            {auth.isLoggedIn && (
                                <div className="w-full px-3">
                                    <button
                                        type="button"
                                        className="rounded-md w-11/12 mx-3 mb-3 p-4 bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        매물 등록
                                    </button>
                                </div>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideBar;