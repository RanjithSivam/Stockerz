import { createContext, useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { candle } from "../api/stock";
import { PropertiesContext } from "./ChartPropertiesContext";

const DataContext = createContext();

const initialState = {
  volume: [],
  ohcl: [],
  area: [],
  loading: false,
  error: {
    isError: false,
    payload: ""
  }
};

const reducer = (state, action) => {
  const myState = {
    ...state,
    error: {
      isError: false,
      payload: ""
    }
  };
  switch (action.type) {
    case "fetching":
      return { ...myState, loading: true };
    case "fetch success":
      return {
        ...myState,
        ohcl: action.payload.ohcl,
        volume: action.payload.volume,
        area: action.payload.area,
        loading: false
      };
    case "fetch error":
      return {
        ...myState,
        loading: false,
        error: { isError: true, payload: action.payload.error }
      };
    default:
      return state;
  }
};

function ChartDataContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { stock } = useParams();
  const { state: chartPropertieState } = useContext(PropertiesContext);

  const fetchData = async (stock, interval) => {
    dispatch({ type: "fetching" });
    try {
      const { ohcl, volume, area } = await candle(stock, interval);
      dispatch({
        type: "fetch success",
        payload: {
          ohcl,
          volume,
          area
        }
      });
    } catch (err) {
      dispatch({
        type: "fetch error",
        payload: {
          error: err
        }
      });
    }
  };

  useEffect(() => {
    fetchData(stock, chartPropertieState.interval);
  }, [stock, chartPropertieState.interval]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export default ChartDataContext;

export { DataContext };
