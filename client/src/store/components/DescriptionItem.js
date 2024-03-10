import React from 'react';

const DescriptionItem = ({ _key, value }) => {
    return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-extrabold leading-6 text-gray-900 text-center">{_key}</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-800 sm:col-span-2 sm:mt-0 text-center">{value}</dd>
        </div>
    );
};

export default DescriptionItem;