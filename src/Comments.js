import React, { useState,useEffect } from 'react';
import "./Comment.css";
import {useParams} from "react-router-dom";

import db from "./firebase";
import {useStateValue} from "./StateProvider";
import firebase from "firebase";

function Comments(){

  const[input,setInput]=useState("");
  const{postId}=useParams();
  const[messages,setMessages]=useState([]);
  const[{user},dispatch]=useStateValue();


//Different routs
  useEffect(()=>{
    if(postId)
    {
    db.collection('posts').doc(postId).onSnapshot((snapshot) =>{
      const data=snapshot.data();
    console.log(data);
  }
    );
    db.collection('posts').doc(postId).collection('messages').orderBy('timestamp','asc').
    onSnapshot((snapshot)=>(
      setMessages(snapshot.docs.map((doc)=>doc.data()))
    ))
  }
},[postId]);





//Message sender function
  const sendMesssage=(e)=>{
     e.preventDefault();
      console.log(input);

        db.collection('posts').doc(postId).collection('messages').add({
          message:input,
          name:user.displayName,
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
      setInput("");
  };

  return (
    <div className="chat">
      <h2 style={{textAlign:"center"}}>Comments</h2>

              <div className="chat__body">
                    
                    {messages.map(message=>(
                      <p className="chat__message">
                      <span className="chat__name" style={{marginBottom:"10px"}}>
                      {message.name}
                      </span>
                      {message.message}
                      </p>
                    ))}
                    
                 
                  </div>

              <div className="chat__footer">
              <form>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message"
                  type="text"
                />
              <button onClick={sendMesssage}
                type="submit">
                  Send a message
                </button>
              </form>
              </div>
    </div>);
}

export default Comments;
