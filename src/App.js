import { BrowserRouter, Routes, Route } from "react-router-dom";
import CombinedContext from "./context/CombinedContext";
import Sidebar from "./components/sidebar/Sidebar";
import StockCrypto from "./components/stockCrypto";

function App() {
  return (
    <BrowserRouter>
      <div className="App flex">
        <Sidebar />
        <Routes>
          <Route exact path="/stock/:stock" element={<StockCrypto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
