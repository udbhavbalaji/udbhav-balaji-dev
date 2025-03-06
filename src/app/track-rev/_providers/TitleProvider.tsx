"use client";

// External Imports
import { createContext, useState } from "react";

// External Imports
import type { TitleContextType } from "@/types";
import type { ProviderPropsType } from "@/types/track-rev";

export const TitleContext = createContext<TitleContextType | null>(null);

const TitleProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [title, setTitle] = useState("Udbhav Balaji");

  const handleTitleUpdate = (title: string) => {
    setTitle(title);
  };

  return (
    <TitleContext.Provider value={{ title, updateTitle: handleTitleUpdate }}>
      {children}
    </TitleContext.Provider>
  );
};

export default TitleProvider;
