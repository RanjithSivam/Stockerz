import "./style.css";

export default function StockOptionButton() {
  return (
    <div className="stock_option_button">
      <div className="stock_quotes">
        <h1>1909.23</h1>
        <p className="gain">+92.23%</p>
      </div>
      <div className="stock_options">
        <button>Summary</button>
        <button>Chart</button>
        <button>statistics</button>
        <button>Profile</button>
        <button>Financials</button>
        <button>Analysis</button>
        <button>Settings</button>
      </div>
      <hr />
    </div>
  );
}
