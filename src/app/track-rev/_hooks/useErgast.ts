import { useContext } from "react";
import { ErgastContext } from "../_providers/ErgastProvider";

const useErgast = () => {
  const context = useContext(ErgastContext);

  if (!context) {
    throw new Error("useErgast must be used within a ErgastProvider");
  }
  return context;
};

export default useErgast;
