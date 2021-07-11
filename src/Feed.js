import React,{useState,useEffect} from 'react';
import "./Feed.css";
import Post from "./Post";
import {Link} from "react-router-dom";

function Feed({term,searchResults,posts}) {
  let objectData=[];

searchResults.map(result=>{
  const{id,data}=result;
  console.log("Inside map ",data.message);
  const data2={
    title:data.title,
    profilePic:data.profilePic,
    message:data.message,
    userName:data.userName,
    image:data.image,
    userId:data.userId
  }
  objectData.push(data2)
})

console.log("In feed.js>>",objectData);


  return(
  <div className="feed">


<Link to="/MessageSender">
    <div className="create__post">
      
        <div className="jumbotron">
        <button className="post__button">Create Post</button>    What is on your mind today
        </div>
    </div>
</Link>

    {term.length===0?posts.map(post => (
      <Post
      key={post.id}
      id={post.id}
      profilePic={post.data.profilePic}
      title={post.data.title}
      message={post.data.message}
      userName={post.data.username}
      image={post.data.image}
      likes={post.data.likes}
     />)):
  objectData.map(result=>(
    <Post profilePic={result.profilePic}
    title={result.title}
     message={result.message}
     userName={result.username}
     image={result.image}
      likes={result.likes}
      />
  ))

     
     }

  </div>
  );
}

export default Feed;
