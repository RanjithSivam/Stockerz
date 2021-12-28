import React, { createContext, useReducer } from 'react';

const SavedContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        { symbol: action.stock.symbol, name: action.stock.name },
      ];
    case 'remove':
      return state.filter((stock) => stock.id !== action.stock.id);
    default:
  }
};

export default function SavedStocksContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SavedContext.Provider value={{ state, dispatch }}>
      {children}
    </SavedContext.Provider>
  );
}

export { SavedContext };
