import "./App.css";
import DevTest from "./DevTest";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./components/wishlist/Wishlist";
import { ToastContainer } from "react-toastify";

export const apiURL = "";
// export const apiURL = "";

function App() {
  return (
    <>
            <ToastContainer />
      <Navbar />
      {/* <Wishlist /> */}
      <Home />
      {/* <DevTest /> */}

    </>
  );
}

export default App;
