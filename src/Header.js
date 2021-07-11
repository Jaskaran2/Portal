import React, { useState } from 'react';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import {Avatar} from '@material-ui/core';
import {useStateValue} from "./StateProvider";
import {Link} from "react-router-dom";


function Header({term,setSearchTerm,searchKeyword}) {
  const[{user},dispatch]=useStateValue();

    return (
      <div className = "header" >

        <div className = "header_left" >
        <img src ="https://i.etsystatic.com/16452967/c/2000/1589/0/239/il/b18081/2816876738/il_340x270.2816876738_jzky.jpg"
        alt = "" />
        <div  className="header_input">
        <SearchIcon className="header_option" />
        <input placeholder="SEARCH" type="text" onChange={(e)=>setSearchTerm(e.target.value)} />
        </div>
        <button className="header__button" onClick={()=>searchKeyword(term)}>Search</button>
        </div>

        <div className = "header_middle">
          <Link to="/">
          <div className="header_option header_option-active">
            <HomeIcon fontSize="large" />
            <p style={{marginLeft:"15px"}}>Home</p>
          </div>
          </Link>

          <Link to="/UsersPosts">
          <div className="header_option header_option-active">
            <PersonIcon fontSize="large" />
            <p style={{marginLeft:"15px"}}>My Posts</p>
          </div>
          </Link>

          <Link to="/TopPosts">
          <div className="header_option header_option-active">
            <LocalPostOfficeIcon fontSize="large" />
            <p style={{marginLeft:"15px"}}>Top Posts</p>
          </div>
          </Link>
         </div>
         

        <div className = "header_right">
          <div className="header_info">
            <Avatar src={user.photoURL}  />
            <h4>{user.displayName||user.email}</h4>
          </div>
        </div>

        </div>
    )
}

export default Header;
