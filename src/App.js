
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import {Switch} from 'react-router';
import LandingWithoutClients from './PageComponents/Landing';
import Dashboard from './PageComponents/Dashboard';
import LandingWithClients from './PageComponents/Landing/LandingWithClients';
import Workflows from "./PageComponents/Workflows";
import Contacts from "./PageComponents/Contacts";
import SaveAndLoad from "./PageComponents/SaveAndLoad";
import Calendar from "./PageComponents/Calendar";
import Navbar from "./PageComponents/Navigation/Navbar";
import Loader from './PageComponents/Loader';
import Authentication from './PageComponents/Authentication'
import Navigation from "./PageComponents/Navigation";
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import db,{databaseContainsData} from "./services/indexDB";
import SaveIcon from "@material-ui/icons/Save";
import Context,{Provider} from "./services/context";


// if client is active display Navigation.
// if client is not active then display NavigationWitSlide
// create new landing page


function App(props){
    const [loaderBool, setLoaderBool] = useState(true)
    const [dataExistsInDB, setDataExistsInDB] = useState(false);


    // db.clients.toArray(function(data){
    //         if(data[0]){
    //            setDataExistsInDB(true)
    //         }else{
    //            setDataExistsInDB(false)
    //         }
    // })

    databaseContainsData().then((result)=>{
        setDataExistsInDB(result)
    })



    let Nav  = dataExistsInDB  ? Navbar : Navigation
    let Landing = dataExistsInDB ? LandingWithClients : LandingWithoutClients


    function redirectToClientsList(){
        window.location.href = "/";
    }

    function redirectToCalendar(){
        window.location.href = "/calendar";
    }

     function redirectToAuthentication(){
        window.location.href = "/authentication";
    }


     function redirectToSaveAndLoad(){
        window.location.href = "/save-and-load";
    }

    // check if clients exists
    
   useEffect(()=>{
      setTimeout(()=>{
         setLoaderBool(false)
      },400)
   },[])

    return (
       <div className="App">
            <Provider>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <BrowserRouter>
                        <div>
                         <Nav 
                           endpointProps = {props} 
                           redirectToClientsList = {redirectToClientsList} 
                           redirectToCalendar={redirectToCalendar}
                           redirectToAuthentication={redirectToAuthentication}
                           redirectToSaveAndLoad={redirectToSaveAndLoad}

                           />
                            <Switch>
                                <Route exact path="/" component={(function(){
                                        
                                            if(loaderBool){
                                                return Loader
                                            }else{
                                                return Landing
                                            }
                                }())} />
                                <Route exact path="/client/:id/client-name/:client/dashboard/workflows/:id/workflow-title/:workflow" component={Workflows} />
                                <Route exact path="/client/:id/client-name/:client/dashboard/workflows" component={Workflows} />
                                <Route exact path="/client/:id/client-name/:client/dashboard/contact/:id/contact-name/:contact" component={Contacts} />

                                 <Route exact path="/client/:id/client-name/:client/dashboard/contacts" component={Contacts} />
                                <Route exact path="/client/:id/client-name/:client/dashboard" component={Dashboard} />
                                <Route exact path="/client/:id/client-name/:client/dashboard/calendar" component={Calendar} />
                                <Route exact path="/calendar" component={Calendar} />
                                <Route exact path="/authentication" component={Authentication} />
                                <Route exact path="/save-and-load" component={SaveAndLoad} />
                                <Redirect from="/*" to="/" />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </MuiPickersUtilsProvider>
            </Provider>
        </div>
    );
  
}

export default withRouter(App);
