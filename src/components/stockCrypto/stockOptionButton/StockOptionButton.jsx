import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { StockContext } from "../../../context/StockInfoContext";
import "./style.css";

const routes = [
  {
    name: "Summary",
    location: "/summary"
  },
  {
    name: "Chart",
    location: "/chart"
  },
  {
    name: "Statistics",
    location: "/statistics"
  },
  {
    name: "Profile",
    location: "/profile"
  },
  {
    name: "Financials",
    location: "/financials"
  },
  {
    name: "Analysis",
    location: "/analysis"
  }
];

export default function StockOptionButton() {
  const location = useLocation();
  const { state: stockInfoState } = useContext(StockContext);

  return (
    <div className="stock_option_button">
      <div className="stock_quotes">
        {stockInfoState.quote[3] && <h1>{stockInfoState.quote[3].value}</h1>}
        {stockInfoState.rawQuote[8] && (
          <p
            className={
              parseFloat(stockInfoState.rawQuote[8].value) < 0 ? "loss" : "gain"
            }
          >
            {stockInfoState.quote[5].value}
          </p>
        )}
      </div>
      <div className="stock_options">
        {routes.map((ele) => (
          <button
            key={ele.name}
            className={`${
              location.pathname.includes(ele.location) ? "active" : ""
            }`}
          >
            <Link to={"." + ele.location}>{ele.name}</Link>
          </button>
        ))}
      </div>
      <hr />
    </div>
  );
}
