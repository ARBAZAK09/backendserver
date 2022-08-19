import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getUser, removecookied, setUserSession } from "../Utils/common";
import { removeUserSession } from "../Utils/common";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Login } from "./Login";
import Cookies from "js-cookie";

 export const Dashboard=(props)=>{
   const[logoutbutton,showlogoutbutton]= useState(true);

   const clientId="78187535842-t7e1dtdemj94mkj0c19n65q2s8o82kq2.apps.googleusercontent.com";
   const onLogoutSuccess=(res)=>{
     showlogoutbutton(true)
     removeUserSession()
     document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
     Cookies.remove("userId",{path:'/',domain:"localhost"});
     history.push("/Login")
      console.log("Logout successfully",res.tokenId)
    }
    

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
          clientId: '716075642837-kergfh0638hu8iq5dimpgnlc1f08s61r.apps.googleusercontent.com',
          scope: 'email',
          plugin_name: 'streamy'
      }).then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          console.log(this.auth);
          this.setState({isSignedIn: this.auth.isSignedIn.get()})
      });
    });
    
    function onSuccess(res) {
      props.setUser(null);
    }

     function deleteCookie(name) {
      document.cookie = `${name}=; path=/; domain=.edyst.com; expires=${new Date(
        0
      ).toUTCString()}`
    }
    
  
    //  const User = getUser();
     const history =useHistory("")
     const handleLogout=()=>{
       showlogoutbutton(true)
        removeUserSession()
     history.push("/Login")
     }
    return(
        <div>
        <h1>You are successfully Logged in </h1>
                            {logoutbutton===true?

        <input type="button"
        value="logout"
        onClick={handleLogout}
        clientId={clientId}
        >
        </input>
        :
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
          deleteCookie={deleteCookie}
          isSignedIn={true}
        >
        </GoogleLogout>
        }
        </div>
    )
 }