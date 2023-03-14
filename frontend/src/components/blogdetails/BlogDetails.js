import * as React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useBlogsContext } from "../../hooks/useBlogsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./blogdetails.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function BlogDetails({ blog }) {
  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();

  const [expanded, setExpanded] = React.useState(null);
  const handleDelete = async () => {

    //line 62 is what i added with ol GP, and it now says unauthorzied to delete for everyone//
    // im leaving it for now to publish// 
    if (user && user._id === blog.user_id) {
      const response = await fetch(
        "https://the-mern-blog-backend.onrender.com/api/blogs/" + blog._id,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();
      //the json data will be the document that was just deleted//
      if (response.ok) {
        dispatch({ type: "DELETE_BLOG", payload: json });
        //here we want to update our BlogsContext state (our global state)//
      }
    } else {
      // User is not authenticated or not the creator of the blog post
      console.log("You are not authorized to delete this blog post");
      console.log(user);
      console.log('user._id: ' + user._id);
      console.log('blog.user_id: ' + blog.user_id);
    }
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Container>
        <Paper elevation={2}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{ backgroundColor: "lightyellow" }}
            >
              <Typography className="postedDiv" component="div">
                <strong>{blog.title} </strong>
                <p>
                  Posted:{" "}
                  {formatDistanceToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="topDiv">
                <Typography component="div">{blog.body}</Typography>

                <div className="bottomDiv">
                  <Typography sx={{ marginRight: 3 }} component="div">
                    Written by: {blog.author}
                    Blog id: {blog._id}
                  </Typography>
                  {user ? (
                    <Chip
                      label="Delete post"
                      onClick={handleDelete}
                      onDelete={handleDelete}
                      deleteIcon={<DeleteIcon />}
                      variant="outlined"
                    ></Chip>
                  ) : null}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </Paper>

        <br></br>
      </Container>
    </div>
  );
}
