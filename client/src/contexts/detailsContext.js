import { createContext, useReducer } from "react";

export const DetailsContext = createContext();

function goalDetailsManager(state, action) {
  switch (action.type) {
    case "READ":
      return { ...action.payload };
    case "READTODOS":
        return { ...state, toDos: [...action.payload] };
    default:
      return;
  }
}

export const DetailsProvider = ({ children }) => {
  const [goalDetails, dispatch] = useReducer(goalDetailsManager, []);
  return (
    <DetailsContext.Provider value={{ goalDetails, dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
};
