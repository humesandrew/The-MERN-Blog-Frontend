import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


// now we can use useAuthContext in anyothe component to invoke global context // 
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth must be inside a BlogsContextProvider");
  }
  return context;
};
