import React, { useState } from 'react';
import "./Login.css";
import {auth,provider} from "./firebase";
import {actionTypes} from "./reducer";
import {useStateValue} from "./StateProvider";

function Login(){
  const[state,dispatch]=useStateValue();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const signIn=() =>{
    auth.signInWithPopup(provider).then(result =>{
      console.log(result);
      dispatch({
        type:actionTypes.SET_USER,
        user:result.user,
      });
    })
    .catch(error => alert(error.message));
  };

  const SignIn=(e)=>{
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .then((auth) => {
      dispatch({
        type:actionTypes.SET_USER,
        user:auth.user,
      });
    })
    .catch(error => alert(error.message))
    
  }

    const Register=(e)=>{
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email,password)
      .then((auth)=>{
        console.log("Auth object",auth);
        dispatch({
          type:actionTypes.SET_USER,
          user:auth.user,
        });
      })
      .catch(err=>alert(err.message));
    }
  return (
    <div className="login">
                <img
                    className="login__logo"
                    src='https://i.etsystatic.com/16452967/c/2000/1589/0/239/il/b18081/2816876738/il_340x270.2816876738_jzky.jpg' 
                />

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email}
                    onChange={e=>setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password'value={password}
                    onChange={e=>setPassword(e.target.value)} />

                    <button type='submit' className="login__signInButton " onClick={SignIn} >Sign In</button>
                </form>

                <p>
                This app focuses on people helping each other. If you have leads regarding any kind of resource which
                 you beleive would help others. Just post it here and possibly someone in need will stumble accross the information.
                </p>

                <button className="login__registerButton" onClick={Register} >Create</button>
            </div>
      <h4>Or</h4>
      <button type="submit" className="login__withGoogle" onClick={signIn}>
      Sign in with google
      </button>
    </div>

  );
}

export default Login;
