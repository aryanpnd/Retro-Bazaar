import {Outlet} from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

import { ToastContainer } from "react-toastify";
import "./css/animations.css";
import { useContext, useEffect } from "react";
import { productsContext } from "./contexts/productsContext";
import axios from "axios";

export const apiURL = "http://localhost:8080";
// export const apiURL = "";

function App() {
  const { setCategory } = useContext(productsContext);

  useEffect(() => {
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
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
