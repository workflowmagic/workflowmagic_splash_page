import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import navbarStyle from "../../../PageComponents/Navigation/Navbar/style";
import {restUrlToObject} from '../../../helper_functions';

function Navbar(props){

 


  function redirectToDashboard() {
      let url = window.location.pathname.slice("");
      let dashboardURL = url.split('dashboard/')[0];
      window.location.href = dashboardURL +"dashboard";
  }

  let clientName = restUrlToObject(window.location.pathname)["client-name"];

  console.log(clientName)

	const {classes} = props;
	return (


          <AppBar className={classes.bgColor} elevation={0}>
	        <Toolbar>
	           
            {(props.endpointProps.location.pathname !== "/" ? <Button className = {classes.navButton} color="inherit" onClick ={props.redirectToClientsList}>Clients</Button>  : null)}
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
           {(window.location.pathname.includes("dashboard/") ? <Button color="grey" onClick ={redirectToDashboard}>Dashboard for  {decodeURI(clientName)}</Button> : null)}

       
            {(props.endpointProps.location.pathname  !== "/authentication" ? <Button color="grey" onClick ={props.redirectToAuthentication}>Sign-up/Sign-in</Button> : null)}
            {(props.endpointProps.location.pathname  !== "/apps" ? <Button color="grey" onClick ={props.redirectToAuthentication}>Apps</Button> : null)}

        </div>
      </Grid>
    </Grid>

	        </Toolbar>
	      </AppBar>
	)
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => (navbarStyle(theme));
export default withStyles(styles)(Navbar);



