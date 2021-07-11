import React, { useEffect, useState } from 'react';
import './Post.css';
import {Avatar} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import {Link} from "react-router-dom";
import {useStateValue} from "./StateProvider";
import db from "./firebase";

function Post({profilePic, image, timestamp,message,title,likes,id}){

  const[{user},dispatch]=useStateValue();
  const[like,setLike]=useState(false);
  const[identity,setId]=useState("");
  const[likeOnce,setLikeOnce]=useState(false);


  function handleClick(e){
    setLike(true);
    setId(id);
}

  const blueColor={
    color:''
  }

 
  if(like && id===identity && !likeOnce){
        blueColor.color="#2e81f4";
        db.collection("posts").doc(id).update({likes:likes+1}).catch(err=>{console.log(err);});
        setLikeOnce(true);  
  }else{
        blueColor.color="";
      }
  
 
  

  console.log("id",id);
  console.log("identity",identity);
  return (
    <div className='post'>
      <div className="post__top">
        <Avatar src={profilePic}
        className="post__avatar" />
        <div className="post__topInfo">
        <h3>{user.displayName}</h3>
        <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>

      <div className="title">
      <h3>{title}</h3>
      </div>

      <div className="post__bottom">
        <p>{message}</p>
      </div>

      <div className="post__image">
        <img src={image} alt="" />
      </div>

        <div className="post__options">
          <div   className="post__option" name={identity}>
            <ThumbUpIcon style={blueColor} />
            <p onClick={handleClick}  >Like   {likes}</p>
          </div>

          <Link to={`/comments/${id}`}>
          <div className="post__option">
            <ChatBubbleOutlineOutlinedIcon />
            <p>Comment</p>
          </div>
          </Link>

        </div>

    </div>


  );
}

export default Post;
