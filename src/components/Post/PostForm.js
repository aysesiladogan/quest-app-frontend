import React, { useState } from "react";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Alert, Button, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  boxShadow: none;
  
`;


const ExpandMore = (props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} style={{
        //transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: 'transform 0.3s'
    }} />;
};

  
function PostForm(props) {
    const {userId, userName, refreshPosts} = props;
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:  title,
                userId: userId,
                text : text,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error"))
    }
    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        refreshPosts();
        setTitle("");
        setText("");
    }
    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }
    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSent(false);
      };

    return(
        <div>
        <Snackbar
        open={isSent}
        autoHideDuration={1200}
        onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="success">
                Your post is sent!
            </Alert>
        </Snackbar>
        <PostContainer>
            <Card sx={{ width: 800, textAlign: 'left' }}>
      <CardHeader
        avatar={
        <StyledLink to={{pathname : '/users/' + userId}}>  
          <Avatar sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
            }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
        </StyledLink>
        }
        title={<OutlinedInput
        id="outlined-adornment-amount"
        multiline
        placeholder="Title"
        inputProps={{maxLength: 25}}
        fullWidth
        value={title}
        onChange={ (i) => handleTitle(i.target.value)}
        >
        </OutlinedInput>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        placeholder="Text"
        inputProps={{maxLength: 250}}
        fullWidth
        value={text}
        onChange={ (i) => handleText(i.target.value)}
        endAdornment = {
            <InputAdornment position="end">
            <Button
            variant="contained"
            style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%',
            color: 'white'}}
            onClick={handleSubmit}
            >Post</Button>
            </InputAdornment>
        }
        >
        </OutlinedInput>
        </Typography>
      </CardContent>
    </Card>
    </PostContainer>
    </div> 
    )
}
export default PostForm;
