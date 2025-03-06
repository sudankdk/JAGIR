import { createContext, useState, useContext } from "react";

// suru ma context banaunu  parxa
const BooleanContext = createContext();

export const BooleanProvider = ({ children }) => {
  const [value, SetValue] = useState<boolean>(false);

  const toggleValue = () => SetValue(true);

  return (
    <BooleanContext.Provider value={{ value, SetValue, toggleValue }}>
      {children}
    </BooleanContext.Provider>
  );
};
export const useBoolean = () => useContext(BooleanContext);
