import { createContext, useReducer } from "react";

export const BlogsContext = createContext();

// the action being edit a blog, create a blog, delete a blog, etc.//
export const blogsReducer = (state, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return {
        blogs: action.payload,
      };
    case "CREATE_BLOG":
      return {
        // we dispatch this CREATE_BLOG action when we want to add soemthing, //
        // which would be the new blog (action with the payload) followed by all the other blogs//
        // to keep the db locally in sync we'll dispatch a new action//
        // basically we're allowing access to global state, and it makes it easier//
        blogs: [action.payload, ...state.blogs],
      };
    case "DELETE_BLOG":
      return {
        blogs: state.blogs.filter((b) => b._id !== action.payload._id),
      };

    default:
      return state;
  }
};

//create a context provider component to wrap our app, where app is the child of BlogsContextProvider//
export const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, {
    blogs: null,
  });

  // we'll call dispatch fxn, taking an object with a type property that describes the //
  // state change we want to make (like CREATE_BLOG, or SET_BLOG)//
  // the 2nd property (first is type) is payload, which is the data we want to pass in//

  return (
    <BlogsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};
