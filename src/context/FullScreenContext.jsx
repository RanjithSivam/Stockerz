import { createContext, useReducer } from "react";

const ScreenContext = createContext();

const initialState = {
  fullscreen: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "on":
      return { ...state, fullscreen: true };
    case "off":
      return { ...state, fullscreen: false };
    default:
      break;
  }
};

function FullScreenContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ScreenContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </ScreenContext.Provider>
  );
}

export default FullScreenContext;

export { ScreenContext };
