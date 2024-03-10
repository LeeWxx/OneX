import React, { useState } from 'react';
import classNames from 'classnames';

import StoreItem from './StoreItem';

const StoreList = ({ data }) => {
    return (
        <ul role="list" className="divide-y divide-gray-200">
            {data.map((item) => (
                <StoreItem item={item} />
            ))}
        </ul>
    );
};

export default StoreList;