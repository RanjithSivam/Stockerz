import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const options = {
  help: [
    {
      icon: "uil uil-search",
      content: "Search Anything",
      name: "search"
    },
    {
      icon: "uil uil-users-alt",
      content: "Community",
      name: "community"
    },
    {
      icon: "uil uil-comment-alt",
      content: "Help & Support",
      name: "help"
    }
  ],
  general: [
    {
      icon: "uil uil-estate",
      content: "Home",
      name: "home"
    },
    {
      icon: "uil uil-chart-line",
      content: "Stock & Funds",
      name: "stock"
    },
    {
      icon: "uil uil-bill",
      content: "Investing",
      name: "investing"
    },
    {
      icon: "uil uil-bitcoin",
      content: "Crypto",
      name: "crypto"
    },
    {
      icon: "uil uil-wallet",
      content: "Wallet",
      name: "wallet"
    }
  ]
};

export default function Sidebar() {
  // const [expand, setExpand] = useState();
  const [active, setActive] = useState("home");
  // ${
  //   expand ? "w-40" : "w-8"
  // }
  return (
    <div className="sidebar">
      <button className="expand_button">
        {/* <i class="uil uil-angle-right"></i> */}
        <i class="uil uil-angle-left"></i>
      </button>
      <div className="logo">
        <div className="name">
          <h2>Stock</h2>
          <p>Mania</p>
        </div>
        <button>Quick Invest</button>
      </div>
      <div className="actions">
        <div className="options help_options">
          {options.help.map((ele) => (
            <button
              key={ele.name}
              value={ele.name}
              onClick={() => setActive(ele.name)}
              className={active === ele.name ? "active" : ""}
            >
              <Link to={`/${ele.name}`}>
                <i className={ele.icon}></i>
                <p>{ele.content}</p>
              </Link>
            </button>
          ))}
        </div>
        <div className="chart_options">
          <p>general</p>
          <div className="options">
            {options.general.map((ele) => (
              <button
                key={ele.name}
                value={ele.name}
                onClick={() => setActive(ele.name)}
                className={active === ele.name ? "active" : ""}
              >
                <Link to={`/${ele.name}`}>
                  <i className={ele.icon}></i>
                  <p>{ele.content}</p>
                </Link>
              </button>
            ))}
          </div>
        </div>

        <div className="watchlist_options">
          <p>watchlist</p>
          <div className="options"></div>
        </div>
      </div>
    </div>
  );
}
