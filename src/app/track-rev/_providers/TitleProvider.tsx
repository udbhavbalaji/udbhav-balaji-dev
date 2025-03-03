"use client";

import { TitleContextType } from "@/types";
import { ProviderPropsType } from "@/types/track-rev";
import { createContext, ReactNode, useState } from "react";

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
