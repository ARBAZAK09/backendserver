import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import {LinkedIn} from 'react-linkedin-login-oauth2';
import { setUserSession } from '../Utils/common';

export const LinkedInPage=()=> {
  const { linkedInLogin } = useLinkedIn({
    clientId: '775gha2pi8hjjh',
    redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
        setUserSession(code,"")
        history.push("/Dashboard");
      console.log(code);
    },
    scope: "r_emailaddress r_liteprofile",

    onError: (error) => {
      console.log(error);
    },
  });
  const history = useHistory("");
  // requestProfile = () => {
  //   var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
  //   var width = 450,
  //     height = 730,
  //     left = window.screen.width / 2 - width / 2,
  //     top = window.screen.height / 2 - height / 2;

  //   window.open(
  //     oauthUrl,
  //     "Linkedin",
  //     "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
  //       width +
  //       ", height=" +
  //       height +
  //       ", top=" +
  //       top +
  //       ", left=" +
  //       left
  //   );
  // };
  // updateProfile = (profile) => {
  //   console.log(profile)
  //     this.setState({
  //       isAuthorized: true,
  //       firstName: _.get(profile,'localizedFirstName',''),
  //       lastName: _.get(profile,'localizedLastName',''),
  //       profileURL: `https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`,
  //       pictureURL: _.get(_.last(_.get(profile,'profilePicture.displayImage~.elements','')),'identifiers[0].identifier','')
  //     })
  // }


  return (
    <img
      onClick={linkedInLogin}
      src="./download.png"
      alt="Sign in with Linked In"
      style={{ maxWidth: '100px', cursor: 'pointer' }}
    />
  );
}
