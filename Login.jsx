import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Card, Form } from "react-bootstrap";
import "./Login.css";
import { LinkedInPage } from "./LinkedInLogin";
import { setUserSession } from "../Utils/common";
import { GoogleLogin } from "react-google-login";
import { getToken } from "../Utils/common";
import { gapi } from "gapi-script";
const clientId =
  "78187535842-t7e1dtdemj94mkj0c19n65q2s8o82kq2.apps.googleusercontent.com";

export const Login = (props) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const history = useHistory("");

  const handlelogin = () => {
    console.log(username);
    axios
      .post("http://localhost:4000/users/signin", {
        username: username,
        password: password,
      })
      .then((response) => {
        setloading(false);
        setUserSession(response.data.token, response.data.user);
        history.push("/Dashboard");
      })
      .catch((error) => {
        setloading(false);
        if (error.response.status === 401 || error.response.status === 400) {
          seterror(error.response.data.message);
        } else {
          seterror("something went wrong , please try again");
        }
        console.error("error>>>", error);
      });
  };
  const onLoginSuccess = (res) => {
    history.push("/Dashboard");
    setUserSession();
    setShowlogoutButton(true);
    console.log("Login successfully", res.tokenId);
  };
  const onLoginFailure = (res) => {
    console.log("Login Failed", res);

    const onSignoutSuccess = () => {
      alert("You have been logged out successfully");
      console.clear();
      setShowloginButton(true);
      setShowlogoutButton(false);
    };
  };
  const onHandleRegister = () => {
    history.push("/RegistrationForm");
  };

  return (
    <div>
      <Card className="main">
        <h1 style={{ display: "-ms-flexbox", boxShadow: "initial" }}>Login</h1>
        <form>
          <br></br>
          <label>Email:</label>
          <br></br> <br></br>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <label>Password:</label>
          <br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          {error && <div className="error">{error}</div>}
          <br></br>
          <div>
            <input
              type="button"
              onClick={handlelogin}
              value={loading ? "Loading..." : "Login"}
              disabled={loading}
            />

            <br></br>
            <br></br>
          </div>
          <div class="col-md-12">
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign In"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={false}
            />
          </div>
          <br></br>
          <div>
            <LinkedInPage />
            <div className="mt-2">
              <span>Dont have an account? </span>
              <span className="loginText" onClick={() => onHandleRegister()}>
                Register here
              </span>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
