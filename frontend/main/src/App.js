import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

import { ToastContainer } from "react-toastify";
import "./css/animations.css";
import { useContext, useEffect } from "react";
import { productsContext } from "./contexts/productsContext";
import axios from "axios";
import LoginModal from "./components/miscellaneous/loginModal/LoginModal";
import { useState } from "react";

export const apiURL = "http://localhost:8080";
// export const apiURL = "";

function App() {
  const { setCategory, setIsAuth, lModal, setLModal } =
    useContext(productsContext);

  useEffect(() => {
    axios
      .get(`${apiURL}/api/checkAuth`, { withCredentials: true })
      .then((res) => {
        setIsAuth(res.data);
      })
      .catch(() => {
        setIsAuth(false);
      });

    axios
      .get(
        `${apiURL}/api/getProductSpecificField?field=category&distinct=true`,
        { withCredentials: true }
      )
      .then((data) => {
        setCategory(data.data);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <LoginModal setModal={setLModal} modal={lModal} />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
