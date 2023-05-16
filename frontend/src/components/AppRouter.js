import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import Home from '../pages/Home';
import { Context } from '../index';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { runInAction } from "mobx";

const AppRouter = observer(() => {
    const { user } = useContext(Context);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                runInAction(() => {
                    user.setIsAuth(true);
                });
            } catch (e) {
                console.error('Error setting auth state:', e);
            }
        }
    }, [user]);
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<h1>ENTERING PAGE</h1>} />
                {user.isAuth && authRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} exact />
                )}
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                <Route path="*" element={<Home />} />
            </Routes>
        </>
    );
});

export default AppRouter;