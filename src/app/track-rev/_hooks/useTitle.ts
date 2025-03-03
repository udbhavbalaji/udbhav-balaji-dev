import { useContext } from "react";
import { TitleContext } from "../_providers/TitleProvider";

const useTitle = () => {
  const context = useContext(TitleContext);

  if (!context) {
    throw new Error("useTitle must be used within a TitleProvider");
  }

  return context;
};

export default useTitle;
