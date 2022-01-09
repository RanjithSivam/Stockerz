import { createContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { profile, quote } from "../api/stock";

const StockContext = createContext();

const initialState = {
  quote: [],
  info: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set quote":
      return { ...state, quote: action.payload };
    case "set info":
      return { ...state, info: action.payload };
    default:
      return state;
  }
};

export default function StockInfoContext({ children }) {
  const { stock } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getQuote = async () => {
    const { data } = await quote(stock);
    dispatch({ type: "set quote", payload: data });
  };

  const getProfile = async () => {
    const { data } = await profile(stock);
    dispatch({ type: "set info", payload: data });
  };

  useEffect(() => {
    getQuote();
    getProfile();
  }, [stock]);

  return (
    <StockContext.Provider value={{ state }}>{children}</StockContext.Provider>
  );
}

export { StockContext };
