import React from 'react';

import { Tab } from '@headlessui/react';
import { PaperClipIcon } from '@heroicons/react/20/solid';

import DescriptionItem from './DescriptionItem';

const DescriptionList = ({ data }) => {
    return (
        <Tab.Panel className="pt-10">
            <div>
                <div className="border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        {Object.keys(data).map((key) => (
                            <DescriptionItem key={key} _key={key} value={data[key]} />
                        ))}
                    </dl>
                </div>
            </div>
        </Tab.Panel>
    );
};

export default DescriptionList;