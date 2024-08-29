import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  boxShadow: none;
  
`;
const StyledCardContent = styled(CardContent)`
  display : flex;
  flex-wrap : wrap;
  justify-content : flex-start;
  align-items : center;
`;

function CommentForm(props) {
    const {userId, userName, postId} = props;
    const [text, setText] = useState("");
    
    const saveComment = () => {
        fetch("/comments", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId : userId,
                text : text,
            }),
        })
        .then((res) =>  res.json())
        .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
    }
    const handleChange = (value) =>  {
        setText(value);
    }
    return (
        <StyledCardContent>

        <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{maxLength : 250}}
        fullWidth
        onChange={(i) => handleChange(i.target.value)}
        startAdornment = {
            <InputAdornment position="start">
                <StyledLink to={{pathname : '/users/' + userId}}>
                    <Avatar sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white', }} aria-label="recipe">
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                </StyledLink>
            </InputAdornment>
        }
        endAdornment = {
            <InputAdornment position="end">
            <Button
            variant="contained"
            style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%',
            color: 'white'}}
            onClick={handleSubmit}
            >Comment</Button>
            </InputAdornment>
        }
        value = {text}
        style = {{color : "black", backgroundColor : 'white'}}
        ></OutlinedInput>    
        </StyledCardContent>
    )

}

export default CommentForm;