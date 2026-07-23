'use client';

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

interface GlobalContextValue {
  lastId: string | null;
  setLastId: Dispatch<SetStateAction<string | null>>;
  breadcrumbsEndPoint: unknown[];
  setBreadcrumbsEndPoint: Dispatch<SetStateAction<unknown[]>>;
  cartItems: unknown[];
  setCartItems: Dispatch<SetStateAction<unknown[]>>;
}

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [lastId, setLastId] = useState<string | null>(null);
  const [breadcrumbsEndPoint, setBreadcrumbsEndPoint] = useState<unknown[]>([]);
  const [cartItems, setCartItems] = useState<unknown[]>([]);
  const value: GlobalContextValue = {
    lastId,
    setLastId,
    breadcrumbsEndPoint,
    setBreadcrumbsEndPoint,
    cartItems,
    setCartItems,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}
