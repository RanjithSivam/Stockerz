import React, { createContext, useReducer } from "react";

const PropertiesContext = createContext();

const initialState = {
  interval: "D",
  chart: "candles",
  indicator: ["volume"],
  fullscreen: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add-indicator":
      return { ...state, indicator: [...state.indicator, action.payload] };
    case "remove-indicator":
      const newState = state.indicator.filter((ele) => ele !== action.payload);
      return { ...state, indicator: newState };
    case "chart":
      return { ...state, chart: action.payload };
    case "interval":
      return { ...state, interval: action.payload };
    case "fullscreen-on":
      return { ...state, fullscreen: true };
    case "fullscreen-off":
      return { ...state, fullscreen: false };
    default:
  }
};

export default function ChartPropertiesContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PropertiesContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export { PropertiesContext };
