import './App.css';
import DevTest from './DevTest';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export const apiURL = "http://localhost:8080"

function App() {
  return (
    <>
      <Navbar />
      <Home />
      {/* <DevTest/> */}
    </>
  );
}

export default App;
