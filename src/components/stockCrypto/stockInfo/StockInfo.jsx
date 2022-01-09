import { useContext } from "react";
import Table from "./Table";
import "./style.css";
import { StockContext } from "../../../context/StockInfoContext";

export default function StockInfo() {
  const { state: stockInfoContext } = useContext(StockContext);

  return (
    <div className="stock_info">
      {stockInfoContext.quote && (
        <div className="info quote">
          <h2 className="mb-2">Stock Quote</h2>
          <Table data={[...stockInfoContext.quote]} />
        </div>
      )}
      {stockInfoContext.info && (
        <div className="info profile">
          <h2 className="mb-2">Stock Information</h2>
          <Table data={[...stockInfoContext.info]} />
        </div>
      )}
    </div>
  );
}
