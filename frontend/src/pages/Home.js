import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components//
import BlogDetails from "../components/blogdetails/BlogDetails";
import BlogForm from "../components/blogform/BlogForm";

import "./home.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const { blogs, dispatch } = useBlogsContext();
  const {user} = useAuthContext();
  // const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      // to summarize, when we load this component we're fetching the blogs , then when the response//
      // is ok and we get the json data, we're firing this dispatch, which in turn fires the //
      // blogReducer fxn and passes in the action (the typeof SET WORKOUTS and this payload of json)//
      // so the whole object will go from property of null to whatever the payload is,//
      //which is the entire array of blogs on the server//
      const response = await fetch("/api/blogs", {
        headers: {'Authorization': `Bearer ${user.token}`}
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BLOGS", payload: json });
        // setBlogs(json);
      }
    };
if (user) {
  fetchBlogs();
}
    //fetchBlogs is the fxn argument in useEffect, so all the stuff above is just defining it. //
    // to look like useEffect(<function>, <dependency>), or in our case the function is fetchBlogs//
  
  }, [dispatch, user]);

  // the component below //
  return (
    <div className="home">
      <div className="blogs">
        <div className="mernDiv">
          <h1>Welcome to the MERN Blog</h1>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} className="left">
              <Item>
                <BlogForm />
              </Item>
            </Grid>
            {/* //now we will map through all the blogs given as response.json // */}
            {/* // we will add javascript logic to the component  using single curlies // */}

            <Grid item xs={12} md={9} className="right">
              <Item>
                {blogs &&
                  blogs.map((blog) => (
                    // we passed in the key which we require and the blog as a prop, so we can access the props inside this component//
                    <BlogDetails key={blog._id} blog={blog} />
                    // because p needs a unique key in react (bc its a child i think)//
                  ))}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default Home;
