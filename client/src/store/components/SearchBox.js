import React from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const SearchBox = () => {
    return (
        <div className="relative mt-2 rounded-md shadow-sm w-72">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
                type="email"
                name="email"
                id="email"
                className="block w-full border-1 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 ring-2 ring-inset ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="가게 이름을 검색해보세요!"
            />
        </div>
    );
};

export default SearchBox;