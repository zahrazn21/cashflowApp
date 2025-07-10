/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode, useContext } from "react";

type AppContextType = {
  category2: number[];
  setCategory2: (id: number[]) => void;
  userName: string;
  setUserName: (name: string) => void;
  step: number;
  setStep: (st: number) => void;
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

  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem("userName") || "";
  });

  const setUserName = (name: string) => {
    setUserNameState(name);
    localStorage.setItem("userName", name);
  };

  const [step, setStepState] = useState<number>(() => {
    const stored = localStorage.getItem("stepTrain");
    return stored ? Number(stored) : 0;
  });

  const setStep = (value: number) => {
    setStepState(value);
    localStorage.setItem("stepTrain", value.toString());
  };

  return (
    <AppContext.Provider
      value={{
        category2,
        setCategory2,
        userName,
        setUserName,
        step,
        setStep,
      }}
    >
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
