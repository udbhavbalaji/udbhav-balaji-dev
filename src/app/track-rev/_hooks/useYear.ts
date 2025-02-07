import { useContext } from "react";
import { YearContext } from "../_providers/YearProvider";

const useYear = () => {
  const context = useContext(YearContext);

  if (!context) {
    throw new Error("useYear must be used within a Year Provider");
  }

  return context;
};

export default useYear;
