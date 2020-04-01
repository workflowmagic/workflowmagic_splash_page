import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';


import SaveIcon from "@material-ui/icons/Save";


import Slide from '@material-ui/core/Slide';
import navigationStyle from "../../PageComponents/Navigation/style"
//import NavigationContent from "../../PageComponents/Navigation/NavigationContent"
import workflowMagicUserDB from "../../services/indexDB";
//import Navbar from "../../PageComponents/Navigation/Navbar"
import 'dexie-observable';


function Navigation(props){  

   const { classes } = props;
   console.log(props.location)
   const [showNavState, updateShowNavState] = useState(false)


	workflowMagicUserDB.on('changes', function (changes) {
	  workflowMagicUserDB.clients.count(function(data){

            data ? updateShowNavState(true) : updateShowNavState(false)
    
    	})

	});

	
    useEffect(()=>{
    	workflowMagicUserDB.clients.count(function(data){
            
            data ? updateShowNavState(true) : updateShowNavState(false)
            
    	})

    },[]);



    return(
        
	    <Slide direction="down" in={showNavState} >
	        <AppBar className={classes.bgColor} elevation={0}>
          <Toolbar>
             
            {(props.endpointProps.location.pathname  !== "/" ? <Button className = {classes.navButton}  color="inherit" onClick ={props.redirectToClientsList}>Clients</Button>  : null)}
            {(props.endpointProps.location.pathname  !== "/calendar" ? <Button className = {classes.navButton}  color="inherit" onClick ={props.redirectToCalendar}>Full Calendar</Button> : null)}
            {(props.endpointProps.location.pathname  !== "/save-and-load" ? <Button className = {classes.saveDataButton} onClick ={props.redirectToSaveAndLoad}><SaveIcon/></Button> : null)}

        <Grid
          justify="space-between" // Add it here :)
          container 
          spacing={24}
        >
        <Grid item>
     
        </Grid>

      <Grid item>
        <div>
    
       
        {(props.endpointProps.location.pathname  !== "/authentication" ? <Button color="grey" onClick ={props.redirectToAuthentication}>Sign-up/Sign-in</Button> : null)}
           {(props.endpointProps.location.pathname  !== "/apps" ? <Button color="grey" onClick ={props.redirectToAuthentication}>Apps</Button> : null)}

        </div>
      </Grid>
    </Grid>

          </Toolbar>
        </AppBar>
      </Slide>
	)
	
}




Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = theme => (navigationStyle(theme));
export default withStyles(styles)(Navigation);



