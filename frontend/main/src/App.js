import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import DevTest from "./DevTest";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Wishlist from "./components/wishlist/Wishlist";
import { ToastContainer } from "react-toastify";
import './css/animations.css'
import { useContext, useEffect } from "react";
import { productsContext } from "./contexts/productsContext";
import axios from "axios";

// export const apiURL = "http://localhost:8080";
export const apiURL = "";

function App() {
  const { setCategory } = useContext(productsContext)

  useEffect(() => {

    axios.get(`${apiURL}/api/getProductSpecificField?field=category&distinct=true`, { withCredentials: true }).then((data) => {
      setCategory(data.data)
    })
  }, [])


  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
