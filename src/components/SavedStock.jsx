import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { SavedContext } from '../context/SavedStocksContext';

function SavedStock() {
  const navigate = useNavigate();

  const { state } = useContext(SavedContext);

  // useEffect(() => {
  //   console.log(state);
  // });

  return (
    <div className="saved_stocks">
      {state &&
        state.map((res, index) => (
          <div className="stock_list" key={index}>
            <p>{res.id}</p>
            <h4>{res.name}</h4>
            <div className="result_action_btn">
              <button
                className="open_stock"
                onClick={() => navigate(`/chart/${res.id}`)}
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
