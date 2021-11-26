import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Wallet from "./components/Wallet/index";
import MintForm from "./components/MintingForm/index";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Wallet />} />
                  <Route path="/mint" element={<MintForm />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
