import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./dist/style/index.scss"
import {BrowserRouter} from "react-router-dom";
import { store } from './redux/app/store';
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
