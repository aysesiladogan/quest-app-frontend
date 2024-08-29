import React, { useEffect, useRef, useState } from "react";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from 'styled-components';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

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

  
function Post(props) {
    const {title, text, userId, userName, postId, likes} = props;
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const isInitialMount = useRef(true);
    const [likeCount, setLikedCount] = useState(likes.length);
    const [likeId, setLikeId] = useState(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
            saveLike();
            setLikedCount(likeCount + 1)
        }
        else{
            deleteLike();
            setLikedCount(likeCount - 1)
        }
    };

    const refreshComments = () => {
        fetch("/comments?postId="+postId)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setCommentList(result)
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
                setError(error);
            }
        )
    }
    const saveLike = () => {
        fetch("/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId, 
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    const checkLikes = () => {
        var likeControl = likes.find((like => like.userId === userId));
        if(likeControl != null){
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
    }

    const deleteLike = () => {
        fetch("/likes/"+likeId, {
            method: "DELETE",
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        if(isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
    }, [commentList])

    useEffect(() => {checkLikes()}, [])
    return(
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
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
        onClick={handleLike}
        aria-label="add to favorites">
        <FavoriteIcon style={isLiked? {color: "red"} :null}/>
        </IconButton>
        {likeCount}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed>
          {error? "error" :
          isLoaded? commentList.map(comment => (
            <Comment key={postId} userId = {1} userName = {"USER"} text = {comment.text}></Comment>
          )) : "Loading"}
          <CommentForm key={postId} userId = {1} userName = {"USER"} postId = {postId}></CommentForm>
        </Container>
      </Collapse>
    </Card>
         
    </PostContainer>
    )

}
export default Post;
