import React from "react";
import { Login } from "./Login";
import {BrowserRouter,Switch,Route,NavLink} from "react-router-dom"
import { Dashboard } from "./Dashboard";
import { PrivateRoute } from "../Utils/PrivateRoute";
import { PublicRoute } from "../Utils/PublicRoutes";
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import {RegistrationForm} from "./RegistrationForm";
import { Planets } from "./Fetch";


export const Landing=()=>{
    return(
        <div>
         <BrowserRouter>
        <Switch>
            <div>
            <PublicRoute exact path="/Login" component={Login}/>
            <PrivateRoute exact path="/Dashboard" component={Dashboard}/>

            </div>
        </Switch>
        <Route exact path="/linkedin" component={LinkedInCallback} />
        <Route exact path="/GoogleLogoutDashboard"></Route>
        <Route exact path="/RegistrationForm" component={RegistrationForm} />
        <Route exact path="/Fetch" component={Planets}/>


        </BrowserRouter>

        </div>

    )
}