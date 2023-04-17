import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "../constant";

export const WebRoutes = () => {
    return (
        <Routes>
            {
                routes.map(({path, Component, exact}, index) => (
                    <Route path={path} element={<Component/>} exact={exact} key={index}/>
                ))
            }
        </Routes>
    );
};
