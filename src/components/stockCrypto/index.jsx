import { Route, Routes, Navigate } from "react-router-dom";
import CombinedContext from "../../context/CombinedContext";
import TopBar from "../topbar";
import Chart from "./chart";
import FullScreenView from "./FullScreenView";
import StockInfo from "./stockInfo";
import StockOptionButton from "./stockOptionButton";

export default () => {
  return (
    <CombinedContext>
      <div className="py-4 px-12 w-full">
        <TopBar />
        <div className="flex w-full pt-4">
          <div className="w-3/4 p-1">
            <StockOptionButton />
            <Routes>
              <Route
                exact
                path="/chart"
                element={
                  <>
                    <FullScreenView />
                    <Chart />
                  </>
                }
              />
              <Route exact path="/summary" element={<></>} />
              <Route exact path="/statistics" element={<></>} />
              <Route exact path="/profile" element={<></>} />
              <Route exact path="/financials" element={<></>} />
              <Route exact path="/analysis" element={<></>} />
              <Route path="" element={<Navigate to="./chart" />} />
            </Routes>
          </div>
          <div className="w-1/4 p-1">
            <StockInfo />
          </div>
        </div>
      </div>
    </CombinedContext>
  );
};
