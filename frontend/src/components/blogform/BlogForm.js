import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useBlogsContext } from "../../hooks/useBlogsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./blogform.css";

// this line const { dispatch } fixed it so that the db updates in sync, but still it throws the//
// missing 'dispatch' dependency error// thats bc useEffect needs an empty array dependency "[]" at the end//

export default function BlogForm() {
  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [error, setError] = React.useState(null);
  const [emptyFields, setEmptyFields] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in.');
      return
    }
    const blog = { title, body, author };
    const response = await fetch("https://the-mern-blog-backend.onrender.com/api/blogs", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: { "Content-Type": "application/json", 
      "Authorization": `Bearer ${user.token}` },
      
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      // console.log("new blog added successfully");//
      setTitle("");
      setBody("");
      setAuthor("");
      dispatch({ type: "CREATE_BLOG", payload: json });
      // console.log("new blog created successfully");//
      setEmptyFields([]);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      className="blogform"
    >
      <Typography
        variant="h5"
        noWrap
        component="span"
        sx={{
          flexGrow: 1,
          display: { xs: "none", sm: "block" },
          textAlign: "center",
        }}
      >
        Write a new blog
      </Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Blog Title"
        multiline
        maxRows={2}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "errorForm" : ""}
      />

      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Body"
        multiline
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className={emptyFields.includes("body") ? "errorForm" : ""}
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Written by"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className={emptyFields.includes("author") ? "errorForm" : ""}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      {error && <div className="error">{error}</div>}
    </Box>
  );
}
