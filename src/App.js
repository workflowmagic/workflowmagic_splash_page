
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import {Switch} from 'react-router';
import LandingWithoutClients from './PageComponents/Landing';
import Dashboard from './PageComponents/Dashboard';
import Landing  from './PageComponents/Landing';

import Context,{Provider} from "./services/context";


// if client is active display Navigation.
// if client is not active then display NavigationWitSlide
// create new landing page


function App(props){

    return (
       <div className="App">

                    <BrowserRouter>
                        <div>
  
                            <Switch>
                                <Route exact path="/" component={Landing} />

                                <Redirect from="/*" to="/" />
                            </Switch>
                        </div>
                    </BrowserRouter>


        </div>
    );
  
}

export default withRouter(App);
