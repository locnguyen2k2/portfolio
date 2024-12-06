import React from 'react';
import routes from './Routes';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, RouterProvider} from 'react-router-dom';
import App from "./App";
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={routes}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </RouterProvider>
    </React.StrictMode>
);


reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
