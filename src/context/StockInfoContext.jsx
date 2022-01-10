import { createContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { profile, quote } from "../api/stock";

const StockContext = createContext();

const initialState = {
  quote: [],
  info: [],
  rawQuote: [],
  rawInfo: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set quote":
      return { ...state, quote: action.payload };
    case "set info":
      return { ...state, info: action.payload };
    case "set raw quote":
      return { ...state, rawQuote: action.payload };
    case "set raw info":
      return { ...state, rawInfo: action.payload };
    default:
      return state;
  }
};

export default function StockInfoContext({ children }) {
  const { stock } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getQuote = async () => {
    if (!state.rawQuote[0] || state.rawQuote[0].value !== stock) {
      const { data, raw } = await quote(stock);
      dispatch({ type: "set quote", payload: data });
      dispatch({ type: "set raw quote", payload: raw });
    }
  };

  const getProfile = async () => {
    if (!state.rawInfo[0] || state.rawQuote[0].value !== stock) {
      const { data, raw } = await profile(stock);
      dispatch({ type: "set info", payload: data });
      dispatch({ type: "set raw info", payload: raw });
    }
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
