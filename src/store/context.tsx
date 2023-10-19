import React, { createContext, useContext } from "react";

import { IRootStore } from "./interfaces";
import { RootStore } from "./RootStore";

let store: IRootStore;

const StoreContext = createContext<RootStore | undefined>(undefined);

function RootStoreProvider({ children }: { children: React.ReactNode }) {
  const root = store ?? new RootStore();
  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}

function useRootStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }
  return context;
}

function usePlaceOrderStore() {
  const store = useRootStore();
  return store.placeOrderStore;
}

function useTakeProfitStore() {
  const store = useRootStore();
  return store.takeProfitStore;
}

export {
  useRootStore,
  usePlaceOrderStore,
  useTakeProfitStore,
  RootStoreProvider,
};
