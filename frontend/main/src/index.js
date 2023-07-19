import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProductsContextProvider } from "./contexts/productsContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Wishlist from "./components/wishlist/Wishlist";
import SearchPage from "./components/search/SearchPage";
import SellPage from "./components/sell/SellPage";
import Product from "./components/product/Product";
import UserProfile from "./components/profile/UserProfile";
import OtpVerification from "./components/miscellaneous/otpVerification/OtpVerification";
import NotFound from "./components/notFoundPage/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<NotFound/>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/search/:query",
        element: <SearchPage />,
      },
      {
        path: "/sell",
        element: <SellPage />,
      },
      {
        path: "/viewproduct/:query",
        element: <Product />,
      },
      {
        path: "/myprofile",
        element: <UserProfile />,
      },
      {
        path:"/phone",
        element:<OtpVerification/>
      }
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductsContextProvider>
    <RouterProvider router={router} />
  </ProductsContextProvider>
);

reportWebVitals();
