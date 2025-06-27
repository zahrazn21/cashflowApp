import { createContext, useContext, useState } from 'react';

// مدل کودک
export interface Child {
  id: number;
  username: string;
}

// تایپ برای context
interface ChildContextType {
  selectedChild: Child | null;
  setSelectedChild: (child: Child) => void;
  childName: Child[];
  setChildName: (children: Child[]) => void;
  stepChild: number;
  setStepChild: (step: number) => void;
}

// ایجاد context اولیه
const ChildContext = createContext<ChildContextType>({
  selectedChild: null,
  setSelectedChild: () => {},
  childName: [],
  setChildName: () => {},
  stepChild: 0,
  setStepChild: () => {},
});

// provider
export const ChildProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [childName, setChildName] = useState<Child[]>([]);
  const [stepChild, setStepChild] = useState<number>(0); // ← اضافه شده

  return (
    <ChildContext.Provider
      value={{ selectedChild, setSelectedChild, childName, setChildName, stepChild, setStepChild }}
    >
      {children}
    </ChildContext.Provider>
  );
};

// هوک برای استفاده در سایر کامپوننت‌ها
export const useChild = () => useContext(ChildContext);
