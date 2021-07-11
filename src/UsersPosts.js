import React,{useEffect, useState} from 'react';
import "./UsersPosts.css";
import Post from "./Post";
import {useStateValue} from "./StateProvider";


function UsersPosts({posts}){
    const[{user},dispatch]=useStateValue();
    let currentUserPosts=[];

posts.map(post => {
    console.log('1',post.data.userId);
    console.log('2',user.uid);
if(post.data.userId===user.uid)
{
    const data2={
        profilePic:post.data.profilePic,
        message:post.data.message,
        userName:post.data.userName,
        image:post.data.image,
        userId:post.data.userId,
        title:post.data.title,
        likes:post.data.likes
      }
    currentUserPosts.push(data2);
    console.log("The current post data is>>", currentUserPosts);
}

});

return(
    <div className="feed">
        <h4>Hey there {user.displayName} here are your posts.</h4><br />

    {currentUserPosts.map(result=>{
       return <Post
      profilePic={result.profilePic}
      title={result.title}
      message={result.message}
      userName={result.username}
      image={result.image} 
      likes={result.likes}
        />
})}


    </div>
)

}

export default UsersPosts;




    // const[userpost,setUserPost]=useState([]);
    // let currentUserId=user.uid;

// useEffect(()=>{
//     db.collection("posts").where("userId","==",currentUserId).onSnapshot((snapshot)=>
//     setUserPost(snapshot.docs.map(((doc) => ({id:doc.id,data:doc.data()}))))
//     );
//     console.log("This worked",userpost);
// },[]);