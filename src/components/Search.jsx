import React, { useState } from 'react';
import { searchStock } from '../api/timeSeries';
import { useNavigate } from 'react-router-dom';
import SavedStock from './SavedStock';

function Search() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [save, setSave] = useState([]);
  const navigate = useNavigate();

  const modifySearch = (event) => {
    const symbol = event.target.value;
    setSearch(symbol);
    searchStock(symbol).then((res) => setResult(res));
  };

  return (
    <div className="search">
      <input
        type="text"
        name="suggestion"
        onChange={modifySearch}
        value={search}
      />
      <div class="stock_lists">
        {result &&
          result.map((res) => (
            <div className="stock_list" key={res['1. symbol']}>
              <h4>{res['1. symbol']}</h4>
              <p>{res['2. name']}</p>
              <div className="result_action_btn">
                <button
                  className="add_stock"
                  onClick={() => setSave([...save, res])}
                >
                  add
                </button>
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
      <SavedStock save={save} />
    </div>
  );
}

export default Search;
