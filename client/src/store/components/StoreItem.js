import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const StoreItem = ({ item }) => {
    return (
        <Link to={`/stores/${item.id}`}>
            <li key={item.id} className="flex justify-between gap-x-6 py-2 h-36">
                <div className="flex min-w-0 gap-x-4 bg-white w-full p-4">
                    <img
                        className="h-20 w-20 flex-none bg-gray-50 rounded-lg"
                        src={`${process.env.REACT_APP_SERVER_URL}/${item.image}`}
                        alt=""
                    />
                    <div className="min-w-0 flex justify-between w-full">
                        <div>
                            <p className="text-base font-medium leading-6 mt-1 text-gray-900">
                                {item.title}
                            </p>
                            <p className="mt-1 truncate text-sm leading-2 text-gray-500">
                                {item.address}
                            </p>
                        </div>
                        <div className="bottom-6/12 flex flex-col justify-end">
                            <p className="font-medium text-sm mb-2 truncate leading-2 text-indigo-500">
								{`${item.key_money} 만원`} 
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    );
};

export default StoreItem;