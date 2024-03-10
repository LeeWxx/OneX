import { Fragment, useState } from 'react';
import { Disclosure, Dialog, Popover, RadioGroup, Tab, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

import SearchBox from './SearchBox';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const product = {
    sizes: [
		{ name: '전체', inStock: true },
        { name: '외식업', inStock: true },
        { name: '서비스업', inStock: true },
        { name: '도 / 소매업', inStock: true },
        { name: '예술/스포츠/시설업', inStock: true },
        { name: '교육/학원업', inStock: true },
        { name: '숙박업', inStock: true },
        { name: '기타', inStock: true },
    ],
};

const TopBar = () => {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

    return (
        <Disclosure as="nav" className="bg-white shadow border-b-gray-1000 border-b border-solid absolute mt-16 z-10 w-full">
            {({ open }) => (
                <Fragment>
                    <div className="mx-auto lg:px-3">
                        <div className="flex justify-between  h-16">	
                            <div className="flex items-center justify-between	">
                                <SearchBox />
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    <div className="mt-1">
                                        <div className="flex items-center justify-between"></div>

                                        <RadioGroup
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                            className="mt-1"
                                        >
                                            <RadioGroup.Label className="sr-only">
                                                Choose a size
                                            </RadioGroup.Label>
                                            <div className="flex justify-start">
                                                {product.sizes.map((size) => (
                                                    <RadioGroup.Option
                                                        key={size.name}
                                                        value={size}
                                                        className={({ active, checked }) =>
                                                            classNames(
                                                                size.inStock
                                                                    ? 'cursor-pointer focus:outline-none'
                                                                    : 'cursor-not-allowed opacity-25',
                                                                active
                                                                    ? 'ring-2 ring-indigo-500 ring-offset-2'
                                                                    : '',
                                                                checked
                                                                    ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                                                                    : 'border-gray-250 bg-gray-20 text-gray-600 hover:bg-gray-150',
                                                                'flex items-center justify-center inline-block rounded-lg border py-3 px-3 mx-2 text-sm font-medium uppercase'
                                                            )
                                                        }
                                                        disabled={!size.inStock}
                                                    >
                                                        <RadioGroup.Label as="span">
                                                            {size.name}
                                                        </RadioGroup.Label>
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Disclosure>
    );
};

export default TopBar;