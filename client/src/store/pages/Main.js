import React, { useState, useEffect, Fragment } from 'react';
import { Route, Link, Routes, useLocation } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

import KakaoMap from './KakaoMap';
import SideBar from './SideBar';
import TopBar from '../components/TopBar';

let currentPath = '';

const Main = () => {
    // let location = useLocation();

    // useEffect(() => {
    //     if (currentPath === location.pathname) window.location.reload();

    //     currentPath = location.pathname;
    // }, [location]);

    const [loadedStores, setLoadedStores] = useState([]);
    const [sideData, setSideData] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_SERVER_URL}/api/stores/`
                );
                setLoadedStores(responseData.stores);
                setSideData(responseData.stores);
            } catch (err) {}
        };
        fetchStores();
    }, [sendRequest]);

    return (
        <Fragment>
            <TopBar />
            {!isLoading && loadedStores && (
                <div className="flex h-screen">
					<SideBar data={sideData} />
                    <KakaoMap stores={loadedStores} setData={setSideData} />
                </div>
            )}
        </Fragment>
    );
};

export default Main;