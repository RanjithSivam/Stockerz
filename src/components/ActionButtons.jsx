import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PropertiesContext } from '../context/ChartPropertiesContext';
import Search from './Search';

export default function ActionButtons({ changeInterval, changeIndicator }) {
  const { state, dispatch } = useContext(PropertiesContext);
  const { stock } = useParams();
  const changeFrame = (event) => {
    const value = event.target.value;
    changeInterval(stock, value);
    dispatch({ type: 'interval', value: value });
  };

  const changeChart = () => {};
  return (
    <div className="action_btns flex justify-between p-1.5">
      <Search />
      <div className="actions">
        {/* <select name="chart" onChange={changeChart} defaultValue={1}>
          <optgroup label="candle">
            <option value="1" selected>
              OHCL
            </option>
          </optgroup>
          <optgroup label="line">
            <option value="2">line</option>
          </optgroup>
          <optgroup label="histogram">
            <option value="2">histogram</option>
          </optgroup>
        </select> */}
        <div className="button_grp border rounded-lg">
          <button
            value="1"
            selected={state.interval === '1'}
            className="px-1 border-r-2 w-1/6"
          >
            1 min
          </button>
          {/* <button value="5" selected={state.interval === '5'}>
            5 min
          </button> */}
          <button
            value="15"
            selected={state.interval === '15'}
            className="px-1 border-r-2 w-1/6"
          >
            15 min
          </button>
          {/* <button value="30" selected={state.interval === '30'}>
            30 min
          </button> */}
          <button
            value="60"
            selected={state.interval === '60'}
            className="px-1 border-r-2 w-1/6 text-xs"
          >
            60 min
          </button>
          <button
            value="D"
            selected={state.interval === 'D'}
            className="px-1 border-r-2 w-1/6"
          >
            1 d
          </button>
          <button
            value="W"
            selected={state.interval === 'W'}
            className="px-1 border-r-2 w-1/6"
          >
            1 w
          </button>
          <button
            value="Y"
            selected={state.interval === 'M'}
            className="px-1 w-1/6"
          >
            1 m
          </button>
        </div>
        {/* <select name="interval" onChange={changeFrame}>
          <optgroup label="minute frame" className="" defaultValue={6}>
            <option value="1" selected={state.interval === '1'}>
              1 min
            </option>
            <option value="5" selected={state.interval === '5'}>
              5 min
            </option>
            <option value="15" selected={state.interval === '15'}>
              15 min
            </option>
            <option value="30" selected={state.interval === '30'}>
              30 min
            </option>
            <option value="60" selected={state.interval === '60'}>
              60 min
            </option>
          </optgroup>
          <optgroup label="other frame">
            <option value="D" selected={state.interval === 'D'}>
              1 d
            </option>
            <option value="W" selected={state.interval === 'W'}>
              1 w
            </option>
            <option value="Y" selected={state.interval === 'M'}>
              1 mo
            </option>
          </optgroup>
        </select> */}
        {/* <select name="indicator" onChange={changeIndicator} defaultValue={1}>
          <optgroup label="none">
            <option value="1" selected>
              none
            </option>
          </optgroup>
          <optgroup label="averages">
            <option value="2">sma</option>
            <option value="3">ema</option>
          </optgroup>
        </select> */}
      </div>
    </div>
  );
}
