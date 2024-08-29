import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
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

function Comment(props) {
    const {text, userId, userName} = props;
    
    return (
        <StyledCardContent>

        <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{maxLength : 25}}
        fullWidth
        value={text}
        startAdornment = {
            <InputAdornment position="start">
                <StyledLink to={{pathname : '/users/' + userId}}>
                    <Avatar sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white', }} aria-label="recipe">
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                </StyledLink>
            </InputAdornment>
        }
        style={{color : "black", backgroundColor : 'white'}}
        ></OutlinedInput>    
        </StyledCardContent>
    )

}

export default Comment;