import React, { useState,useEffect } from "react";
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar"
import Feed from "./Feed"
import Widgets from "./Widgets";
import Login from "./Login";
import {useStateValue} from "./StateProvider";
import db from "./firebase";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Comments from "./Comments";
import MessageSender from "./MessageSender";
import UsersPosts from "./UsersPosts";
import TopPosts from "./TopPosts";


function App() {

  const[{user},dispatch]=useStateValue();
  const[searchTerm,setSearchTerm]=useState("");
  const [posts,setPosts]=useState([]);
  const [searchResults,setSearchResults]=useState([]);



  useEffect(() => {
    db.collection("posts").orderBy("timestamp","desc").onSnapshot((snapshot) =>
    setPosts(snapshot.docs.map((doc) => ({id:doc.id,data:doc.data()})))
  );
  }, []);

  function handleSearch(searchTerm){

    if(searchTerm!==""){
      const newPosts=posts.filter((post)=>{
        const [key,postObject]=Object.values(post);
        const message={
          title:postObject.title,
          message:postObject.message,
          image:postObject.image,
          profilePic:postObject.profilePic,
          userName:postObject.userName
        }
        return Object.values(message).join("").toLowerCase().includes(searchTerm.toString().toLowerCase());

      });
      setSearchResults(Object.values(newPosts));
      console.log("result are>>>",searchResults);

    }
    else{
      searchResults(posts)
    }
  }



    return (

      <div className = "app" >
          <Router>
          {!user?<Login />:
        <div>
            <Header term={searchTerm} setSearchTerm={setSearchTerm}  searchKeyword={handleSearch} />
          { /*App body*/ }
          <div className="app__body">
    
            <Switch>
              
              <Route path="/comments/:postId">
                <Comments posts={posts} />
              </Route>

              <Route path="/MessageSender">
                <MessageSender />
              </Route>

              <Route path="/UsersPosts">
                <UsersPosts posts={posts} />
              </Route>

              <Route path="/TopPosts">
                <TopPosts posts={posts} />
              </Route>
              
              <Route path="/">
              <Sidebar />
              <Feed  term={searchTerm} searchResults={searchResults} posts={posts}/>
              </Route>

            
            </Switch>
            <Widgets />
          </div>

        </div>}
      </Router>




         </div>
    );
}

export default App;
