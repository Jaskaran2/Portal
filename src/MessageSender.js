import React, { useState } from "react";
import "./MessageSender.css";
import {Avatar} from '@material-ui/core';
import {useStateValue} from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";
import {storage} from "./firebase";
import {Link} from "react-router-dom";

function MessageSender(){
  const[{user},dispatch]=useStateValue();

  const[title,setTitle]=useState('');
  const[input,setInput]=useState('');
  const[imageUrl,setimageUrl]=useState('');
  const[image,setImage]=useState(null);
  const[previewState,setPreviewState]=useState("");

  const handleSubmit=e =>{
    e.preventDefault();
    db.collection("posts").add({
      title:title,
      message:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic:user.photoURL,
      userId:user.uid,
      userName:user.displayName,
      image:imageUrl,
      likes:0
    });
    setimageUrl(" ");
    setInput(" ");
    setTitle(" ");
    setPreviewState(" ");
  };

  function handleTitle(e){
    setTitle(e.target.value);
  }

  function handleUpload(e){
    e.preventDefault();
    const uploadTask=storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error=>{
        console.log(error);
      },
      ()=>{
        storage.ref("images").child(image.name).
        getDownloadURL().then(url=>{
          setimageUrl(url);
          console.log(url);
        });
      }
    )
  }

  console.log(image);

  


  //.............

  function handleImageChange(e) {
    const reader=new FileReader();
    const selectedFile=e.target.files[0];
    if(selectedFile){
    reader.onload=()=>{
        setPreviewState(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);

    if(setImage(e.target.files[0])){
      setImage(e.target.files[0]);
    }
  }

  return(
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
        <form>

          <div className="message">
            <label>Title</label>
            <input type="text" style={{MarginBottom:'30px'}} onChange={handleTitle} />
            <br />
            
            <lable><strong>Post</strong></lable>
            <br />
            <br />
          <textarea cols="150" rows="10" value={input} style={{paddingBottom:"7px"}} 
          onChange={e => setInput(e.target.value)}
           type="text"
        placeholder="Whats on your mind"
        className="messageSender__input" />
{title.length>0?<Link to="/">
    <button className="submit__button" onClick={handleSubmit} type="submit"> Submit</button>
  </Link>: <button className="submit__button__inactive" onClick={handleSubmit} type="submit" disabled > Submit</button>}

    <div className="image__upload">
        <input type="text" className="text__input"
          value={imageUrl}
          onChange={e => setimageUrl(e.target.value)}
        placeholder="Wait for img URL if uploaded a picture else paste one" />

         </div>
          </div>
      <div className="file__upload">
      <input type="file" className="input__image"
          onChange={handleImageChange}/>

<button className="upload__button" onClick={image&&handleUpload} type="submit">
         Upload
         </button>


          <div className="image__preview" >
            <img className="preview__image"   src={previewState}></img>
            <span className="image__preview__text">Image preview</span>
          </div>


      </div>
        </form>
      </div>

      

    </div>
  );
}

export default MessageSender;
