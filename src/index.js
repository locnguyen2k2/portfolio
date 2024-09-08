import React from 'react';
import routes from './Routes';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={routes}>
            <BrowserRouter>
            </BrowserRouter>
        </RouterProvider>
    </React.StrictMode>
);


reportWebVitals();