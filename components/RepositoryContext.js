import { createContext } from "react";

export const RepositoryContext = createContext();

export const RepositoryProvider = ({ children }) => {
  return <RepositoryContext.Provider>{children}</RepositoryContext.Provider>;
};
