import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';

function SavedStock({ save }) {
  //   const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     setStocks(save);
  //     console.log(save);
  //   }, [save]);
  return (
    <div className="saved_stocks">
      {save &&
        save.map((res) => (
          <div className="stock_list" key={res['1. symbol']}>
            <p>{res['1. symbol']}</p>
            <h4>{res['2. name']}</h4>
            <div className="result_action_btn">
              <button
                className="open_stock"
                onClick={() => navigate(`/chart/${res['1. symbol']}`)}
              >
                open
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SavedStock;
