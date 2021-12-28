import React, { useContext, useState } from 'react';
import { searchStock } from '../api/timeSeries';
import { useNavigate } from 'react-router-dom';
import SavedStock from './SavedStock';
import { SavedContext } from '../context/SavedStocksContext';

function Search() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const { dispatch } = useContext(SavedContext);

  const modifySearch = (event) => {
    const symbol = event.target.value;
    setSearch(symbol);
    searchStock(symbol).then((res) => setResult(res));
  };

  const changeStock = (stock) => {
    navigate(`/chart/${stock}`);
    setResult([]);
  };

  return (
    <div className="search">
      <div className="relative inline-block">
        <div className="flex items-center border border-black px-2 py-1 rounded">
          <input
            type="text"
            name="suggestion"
            onChange={modifySearch}
            value={search}
            className="mr-2"
          />
          <div className="bg-slate-100 p-2 rounded-full flex">
            <i class="fas fa-search text-xs"></i>
          </div>
        </div>
        <div class="stock_lists absolute z-50 top-full left-0 right-0 border-y-0">
          {result &&
            result.map((res) => (
              <div
                className="stock_list p-2.5 bg-white border-b border-solid border-black flex justify-between"
                key={res['1. symbol']}
              >
                <h4 className="font-semibold mr-1">{res['1. symbol']}</h4>
                <div className="result_action_btn ml-2">
                  <p className="font-xs text-xs">{res['2. name']}</p>
                  <button
                    className="add_stock border bg-slate-100 m-1 p-0.5 cursor-pointer hover:bg-slate-400 rounded hover:text-white"
                    onClick={() =>
                      dispatch({
                        type: 'add',
                        stock: {
                          symbol: res['1. symbol'],
                          name: res['2. name'],
                        },
                      })
                    }
                  >
                    add
                  </button>
                  <button
                    className="open_stock border bg-slate-100 m-1 p-0.5 cursor-pointer hover:bg-slate-400 rounded hover:text-white"
                    // onClick={() => navigate(`/chart/${res['1. symbol']}`)}
                    onClick={() => changeStock(res['1. symbol'])}
                  >
                    open
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
