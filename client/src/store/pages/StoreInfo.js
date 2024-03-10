import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import classNames from 'classnames';
import {
    CalendarDaysIcon,
    PhoneIcon,
    UserCircleIcon,
    CreditCardIcon,
    StarIcon,
    PaperClipIcon,
} from '@heroicons/react/20/solid';

import { Fragment } from 'react';
import { Tab } from '@headlessui/react';

import DescriptionList from '../components/DescriptionList';

const StoreInfo = () => {
    const [loadedStore, setLoadedStore] = useState();
	const [loadedUser, setLoadedUser] = useState("");
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const storeid = useParams().sid;

	 function getRandomNumber(){
        let phone = "0504";
        while(phone.length < 13) phone += Math.floor(Math.random() * 10);
        return phone;
    }
	
    useEffect(() => {
        const fetchStoresAndUser = async () => {
            try {
                const responseStoreData = await sendRequest(
                    `${process.env.REACT_APP_SERVER_URL}/api/stores/${storeid}`
                );
				
                console.log(responseStoreData);
                setLoadedStore(responseStoreData.store);
				
				const responseUserData = await sendRequest(
                    `${process.env.REACT_APP_SERVER_URL}/api/users/${responseStoreData.store.creator}`
                );
				
				console.log(responseUserData);
                setLoadedUser(responseUserData.user);
				
            } catch (err) {
                console.log(err);
            }
        };
        fetchStoresAndUser();
    }, [sendRequest, storeid]);

    return (
        <div className="bg-white">
            {!isLoading && loadedStore && (
                <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                        {/* Product image */}
                        <div className="lg:col-span-4 lg:row-end-1">
                            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src={`${process.env.REACT_APP_SERVER_URL}/${loadedStore.image}`}
                                    alt=""
                                    className="object-fill w-full h-96 object-center"
                                />
                            </div>
                        </div>

                        {/* Product details */}
                        <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                            <div className="lg:col-start-3 lg:row-end-1">
                                <h2 className="sr-only">Summary</h2>
                                <div className="rounded-lg bg-white-100 shadow-sm ring-1 ring-gray-900/5">
                                    <dl className="flex flex-wrap">
                                        <div className="flex-auto pl-6 pt-6">
                                            <dt className="text-2xl font-semibold leading-6 text-gray-900">
                                                {loadedStore.title}
                                            </dt>
                                            <dd className="mt-1 text-sm font-semibold leading-6 text-gray-600">
                                                {loadedStore.address}
                                            </dd>
                                        </div>
                                        <div className="mt-6 flex w-full flex-none border-t border-gray-900/5 px-6 pt-6">
                                            <dt className="flex-none">
                                                <span className="sr-only">DepositAndMonthly</span>
                                            </dt>
                                            <dd className="text-lg font-bold leading-6 text-gray-900">
                                                보증금 {loadedStore.deposit}만원 / 월세{' '}
                                                {loadedStore.monthly_rent}
                                                만원
                                            </dd>
                                        </div>
                                        <div className="mt-4 flex w-full flex-none px-6 mb-3">
                                            <dt className="flex-none">
                                                <span className="sr-only">KeyMoney</span>
                                            </dt>
                                            <dd className="text-xl font-bold leading-6 text-indigo-700">
                                                권리금 {loadedStore.key_money}만원
                                            </dd>
                                        </div>
                                        <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                            <dt className="flex-none">
                                                <span className="sr-only">Name</span>
                                                <UserCircleIcon
                                                    className="h-6 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </dt>
                                            <dd className="text-lg font-semibold leading-6 text-gray-700">
                                                {loadedUser.name}
                                            </dd>
                                        </div>
                                        <div className="mt-4 flex w-full flex-none gap-x-4 px-6 mb-3">
                                            <dt className="flex-none">
                                                <span className="sr-only">PhoneNumber</span>
                                                <PhoneIcon
                                                    className="h-6 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </dt>
                                            <dd className="text-lg font-semibold leading-6 text-gray-700">
                                                {getRandomNumber()}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h3 className="text-sm font-medium text-gray-900">Share</h3>
                                <ul role="list" className="mt-4 flex items-center space-x-6">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">Share on Facebook</span>
                                            <svg
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">Share on Instagram</span>
                                            <svg
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">Share on X</span>
                                            <svg
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                            <Tab.Group as="div">
                                <div className="border-b border-gray-200">
                                    <Tab.List className="-mb-px flex space-x-8">
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    selected
                                                        ? 'border-indigo-600 text-indigo-600 !outline-none'
                                                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                                                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                                                )
                                            }
                                        >
                                            매물 정보
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    selected
                                                        ? 'border-indigo-600 text-indigo-600 !outline-none'
                                                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                                                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                                                )
                                            }
                                        >
                                            금액 정보
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    selected
                                                        ? 'border-indigo-600 text-indigo-600 !outline-none'
                                                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                                                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                                                )
                                            }
                                        >
                                            상세 설명
                                        </Tab>
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    <DescriptionList
                                        data={{
                                            상호명: loadedStore.title,
                                            주소: loadedStore.address,
                                            층수:
                                                loadedStore.floor +
                                                '층' +
                                                ' / ' +
                                                loadedStore.total_floor +
                                                '층',
                                            '주차 가능': loadedStore.parking_availability
                                                ? '가능'
                                                : '불가능',
                                            '공급 면적': '22.3' + '㎡',
                                        }}
                                    />
                                    <DescriptionList
                                        data={{
                                            권리금: loadedStore.key_money + '만원',
                                            보증금: loadedStore.deposit + '만원',
                                            월세: loadedStore.monthly_rent + '만원',
                                            관리비: loadedStore.maintenance_cost + '만원',
                                        }}
                                    />
                                    <Tab.Panel className="pt-10">
                                        <div className="bg-slate-50 h-96 rounded-lg">
                                            <p className="text-gray-900 p-5 leading-6">
                                                {loadedStore.description}
                                            </p>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreInfo;