import { useContext, useEffect } from "react";
import { StockContext } from "../../context/StockInfoContext";
import "./style.css";
export default function TopBar() {
  const { state: stockInfoState } = useContext(StockContext);

  useEffect(() => {
    console.log(stockInfoState);
  }, [stockInfoState]);
  return (
    <div className="top_bar">
      <div className="invest_info">
        {stockInfoState.rawInfo[1] && (
          <div className="logo">
            <img src={stockInfoState.rawInfo[1].logo} alt=" " />
          </div>
        )}
        {stockInfoState.rawInfo[1] && (
          <div className="name">
            <p>{stockInfoState.rawInfo[1].ticker}</p>
          </div>
        )}
      </div>
      <div className="top_actions">
        <button className="add_watchlist">
          <i class="uil uil-plus"></i>
          <p>Add to watchlist</p>
        </button>
        <div className="other_actions">
          <button>
            <i class="uil uil-search-alt"></i>
          </button>
          <button>
            <i class="uil uil-bell"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
