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
            <FullScreenView />
            <Chart />
          </div>
          <div className="w-1/4 p-1">
            <StockInfo />
          </div>
        </div>
      </div>
    </CombinedContext>
  );
};
