import React, { createContext, useReducer } from 'react';

const PropertiesContext = createContext();

const initialState = {
  interval: 'D',
  chart: 1,
  indicator: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'indicator':
      return { ...state, indicator: action.value };
    case 'chart':
      return { ...state, chart: action.value };
    case 'interval':
      return { ...state, interval: action.value };
    default:
  }
};

export default function ChartPropertiesContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PropertiesContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export { PropertiesContext };
