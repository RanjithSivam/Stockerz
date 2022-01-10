import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CombinedContext from "./context/CombinedContext";
import Sidebar from "./components/sidebar/Sidebar";
import StockCrypto from "./components/stockCrypto";

function App() {
  return (
    <BrowserRouter>
      <div className="App flex">
        <Sidebar />
        <Routes>
          <Route path="/stock/:stock/*" element={<StockCrypto />} />
          {/* <Route path="" element={<Navigate to="/home" />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
