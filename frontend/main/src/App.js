import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DevTest from "./DevTest";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import { ToastContainer } from "react-toastify";
import './css/animations.css'

// export const apiURL = "http://localhost:8080";
export const apiURL = "";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
