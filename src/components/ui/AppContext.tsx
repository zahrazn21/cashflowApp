/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode, useContext } from "react";

type AppContextType = {
  category2: number[];
  setCategory2: (id: number[]) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [category2, setCategory2State] = useState<number[]>(() => {
    const stored = localStorage.getItem("category2");
    return stored ? JSON.parse(stored) : [];
  });

  const setCategory2 = (value: number[]) => {
    setCategory2State(value);
    localStorage.setItem("category2", JSON.stringify(value));
  };

  return (
    <AppContext.Provider value={{ category2, setCategory2 }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext باید داخل AppProvider استفاده شود");
  }
  return context;
};
