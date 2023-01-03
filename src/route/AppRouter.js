import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/registration" element={<Registration />} />
                </Route>
            </Routes>

        </>
    )
}

export default AppRouter