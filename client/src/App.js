import React, { Fragment, useState, useCallback } from 'react';

import { Route, Routes, Outlet } from 'react-router-dom';

import MainLayout from './layout/MainLayout';

import Join from './user/pages/Join';
import Login from './user/pages/Login';

import Main from './store/pages/Main';
import NewStore from './store/pages/NewStore';
import StoreInfo from './store/pages/StoreInfo';
import { AuthContext } from './context/auth-context';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(false);

    const login = useCallback((uid) => {
        setIsLoggedIn(true);
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn((prev) => false);
        setUserId(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
        >
            <Routes>
                <Route path="" element={<MainLayout />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/stores/new" element={<NewStore />} />
                    <Route path="/stores/:sid" element={<StoreInfo />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/join" element={<Join />} />
                </Route>
            </Routes>
        </AuthContext.Provider>
    );
};

export default App;