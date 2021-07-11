import React from 'react';
import Post from './Post';
import "./TopPosts.css"

function TopPosts({posts}) {
    
    const numberOfLikes=[];
    let i=0;
   var maxIndex=[];
   var maxPoints=[];
   const topPosts=[];

    posts.map(post=>{
        const likes={
            likes:post.data.likes
        }
        numberOfLikes.push(likes);
    });

//Finding max Likes..................................

    function findLargest4() {
        maxPoints[0] = 0;
        maxPoints[1] = 0;
        maxPoints[2] = 0;
        maxPoints[3] = 0; 
        
        for (i = 0; i < numberOfLikes.length; i++) {
          if (numberOfLikes[i].likes> maxPoints[0]) {
            maxPoints[0] = numberOfLikes[i].likes;
            maxIndex[0] = i;
          }
        }
      
        for (i = 0; i <  numberOfLikes.length; i++) {
          if (numberOfLikes[i].likes > maxPoints[1] && numberOfLikes[i].likes < maxPoints[0]) {
            maxPoints[1] = numberOfLikes[i].likes;
            maxIndex[1] = i;
          }
        }
      
        for (i = 0; i <  numberOfLikes.length; i++) {
          if (numberOfLikes[i].likes > maxPoints[2] && numberOfLikes[i].likes< maxPoints[1]) {
            maxPoints[2] = numberOfLikes[i].likes;
            maxIndex[2] = i;
          }
        }

        for (i = 0; i <  numberOfLikes.length; i++) {
          if (numberOfLikes[i].likes > maxPoints[3] && numberOfLikes[i].likes< maxPoints[2]) {
            maxPoints[3] = numberOfLikes[i].likes;
            maxIndex[3] = i;
          }
        }
      
        console.log( maxPoints[0] + "/" + maxPoints[1] + "/" + maxPoints[2]);
      }

      findLargest4(); 

      posts.map(post => {
    if(post.data.likes=== maxPoints[2]||post.data.likes===maxPoints[1]||post.data.likes===maxPoints[0]||post.data.likes===maxPoints[3])
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
        topPosts.push(data2);
    }
    
    });

//..............................................

    return (
        <div className="top__posts">
            
        <h3 className="top__posts__heading">Top 4 Posts</h3>

    {topPosts.map(result=>{
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

export default TopPosts
