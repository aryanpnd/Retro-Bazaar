import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProductsContextProvider } from './contexts/productsContext';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import Wishlist from './components/wishlist/Wishlist';
import Navbar from './components/navbar/Navbar';
import SearchPage from './components/search/SearchPage';
import SellPage from './components/sell/SellPage';


const router = createBrowserRouter([
    {
        path: "/",
        element: (<App />),
        children: [
            {
                path: "",
                element: (<Home />)
            },
            {
                path: "/wishlist",
                element: (<Wishlist />)
            },
            {
                path: "/search/:query",
                element: (<SearchPage />)
            },
            {
                path: "/sell",
                element: (<SellPage />)
            },
        ]
    }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProductsContextProvider>
        <RouterProvider router={router} />
    </ProductsContextProvider>
);

reportWebVitals();
