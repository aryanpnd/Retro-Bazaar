import "./App.css";
import DevTest from "./DevTest";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./components/wishlist/Wishlist";

export const apiURL = "";

function App() {
  return (
    <>
      <Navbar />
      {/* <Wishlist /> */}
      <Home />
      {/* <DevTest /> */}

    </>
  );
}

export default App;
