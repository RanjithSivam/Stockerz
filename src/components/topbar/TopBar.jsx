import "./style.css";
export default function TopBar() {
  return (
    <div className="top_bar">
      <div className="invest_info">
        <div className="logo">
          <img
            src="https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png"
            alt=" "
          />
        </div>
        <div className="name">
          <p>IBM</p>
        </div>
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
