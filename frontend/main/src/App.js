import "./App.css";
import DevTest from "./DevTest";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./components/wishlist/Wishlist";

export const apiURL = "http://localhost:8080";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Wishlist />
      {/* <Home /> */}
      {/* <DevTest /> */}

    </>
  );
}

export default App;
