import { BlogsContext } from "../context/BlogContext";
import { useContext } from "react";

export const useBlogsContext = () => {
  const context = useContext(BlogsContext);

  if (!context) {
    throw Error("useContext must be inside a BlogsContextProvider");
  }
  return context;
};
