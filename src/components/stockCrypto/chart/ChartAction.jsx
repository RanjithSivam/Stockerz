import React, { useContext, useEffect, useState } from "react";
import { PropertiesContext } from "../../../context/ChartPropertiesContext";
import { ScreenContext } from "../../../context/FullScreenContext";

const buttonProperties = [
  {
    value: "1",
    content: "1M"
  },
  {
    value: "15",
    content: "15M"
  },
  {
    value: "60",
    content: "60M"
  },
  {
    value: "D",
    content: "1D"
  },
  {
    value: "W",
    content: "1W"
  },
  {
    value: "M",
    content: "1Mo"
  }
];

export default function ChartAction({ fullscreen }) {
  const [hide, setHide] = useState(true);
  const { state, dispatch } = useContext(PropertiesContext);

  const { dispatch: fullScreenDispatch } = useContext(ScreenContext);
  const changeFrame = (event) => {
    const value = event.target.value;
    dispatch({ type: "interval", payload: value });
  };

  const changeChart = (event) => {
    const value = event.target.value;
    dispatch({ type: "chart", payload: value });
  };

  const addIndicator = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      dispatch({ type: "add-indicator", payload: value });
    } else {
      dispatch({ type: "remove-indicator", payload: value });
    }
  };

  return (
    <div className="action_btns flex justify-between p-1.5 items-center">
      <div className="flex">
        <button
          className="flex items-center text-xs mr-2"
          onClick={() =>
            fullscreen
              ? fullScreenDispatch({ type: "off" })
              : fullScreenDispatch({ type: "on" })
          }
        >
          {fullscreen ? (
            <>
              <i class="fas fa-times text-white"></i>
              <p className="ml-1 text-white">Close</p>
            </>
          ) : (
            <>
              <i class="uil uil-expand-arrows-alt"></i>
              <p className="ml-1">Fullscreen</p>
            </>
          )}
        </button>
        <button
          className={`flex items-center text-xs mr-2 ${
            fullscreen ? "text-white" : ""
          }`}
        >
          <i class="uil uil-comparison"></i>
          <p className="ml-1">Compare</p>
        </button>
        <button className="dropdown_container relative">
          <div
            className={`flex items-center text-xs mr-2 ${
              fullscreen ? "text-white" : ""
            }`}
            onClick={() => setHide(!hide)}
          >
            <i class="uil uil-angle-down"></i>
            <p className="ml-1">Indicator</p>
          </div>
          <dl
            className={`dropdown absolute z-20 bg-white p-4 top-6 ${
              hide ? "hidden" : ""
            }`}
          >
            <dt className="font-bold">Charts</dt>
            <dd>
              <label>CandleSticks</label>
              <input
                type="radio"
                value="candles"
                name="chart"
                checked={state.chart === "candles"}
                onClick={changeChart}
              />
            </dd>
            <dd>
              <label>Line</label>
              <input
                type="radio"
                value="line"
                name="chart"
                checked={state.chart === "line"}
                onClick={changeChart}
              />
            </dd>
            <dt className="font-bold">Indicator</dt>
            {/* <dd>
              <label>SMA</label>
              <input
                type="checkbox"
                value="sma"
                name="indicator"
                checked={state.indicator.includes("sma")}
                onClick={addIndicator}
              />
            </dd>
            <dd>
              <label>EMA</label>
              <input
                type="checkbox"
                value="ema"
                name="indicator"
                checked={state.indicator.includes("ema")}
                onClick={addIndicator}
              />
            </dd> */}
            <dd>
              <label>Volume</label>
              <input
                type="checkbox"
                value="volume"
                name="indicator"
                checked={state.indicator.includes("volume")}
                onClick={addIndicator}
              />
            </dd>
          </dl>
        </button>
      </div>
      <div className="actions">
        <div className="interval_button_grp border rounded-lg w-60 flex items-center overflow-hidden">
          {buttonProperties.map((btn) => (
            <button
              value={btn.value}
              className={`w-1/6 text-xs p-1 bg-white ${
                state.interval === btn.value ? "bg-slate-600 text-white" : ""
              }`}
              onClick={changeFrame}
            >
              {btn.content}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
