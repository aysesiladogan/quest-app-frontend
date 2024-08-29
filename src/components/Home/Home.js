import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import styled from "styled-components";
import PostForm from "../Post/PostForm";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f5ff;
  min-height: 100vh;
  padding: 20px;
`;




function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPosts = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setIsLoaded(true);
                setPostList(result)
            },
            (error) => {

            }
        )
    }

    useEffect(() => {
        refreshPosts();
    }, []);

    if(error) {
        return <div> Error !!! </div>;
    } else if(!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return(
            <StyledDiv>
                <PostForm userId={1} userName={"ddd"} refreshPosts={refreshPosts} />
                {postList.map(post => (
                    <Post key={post.id} likes = {post.postLikes} postId = {post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>   
                ))}
            </StyledDiv>
        );
    }

}
export default Home;
