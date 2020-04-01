import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import "../../PageComponents/fonts/index.css";
import CreateClients from "../../PageComponents/Landing/CreateClients";
import landingStyle from "../../PageComponents/Landing/style"
import SaveIcon from "@material-ui/icons/Save";

function LandingWithClients(props){

  const [clientsDoExist, setClientsDoExist] = useState(false);
  const [loadingBool, setloadingBool] = useState(true);
  const { classes } = props;



  return (
     <div className = {classes.bgImage}> 
        <div className={classes.root}>
            <Grid container spacing={12}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12} sm={12}>
              </Grid>
              <Grid item xs={12} sm={12}>
                  <div className={classes.interactionContainer}>
                      <h1 className="logoFontContainer">
                          Workflow Magic
                      </h1>
                        <div className={classes.callToActionContainer} ><h3 className={classes.yourAppIsReadyTitle}>Your app is ready!</h3>
                         <p className={classes.signInSignUpNoHover}>
                         To get started click a client name that you entered below.
                         You can add as many clients as you want. Use the up and down arrows on your keyboard to make toggling faster!</p>
                         <p className={classes.signInSignUpNoHover}>To save your work click <SaveIcon/> or sign in. </p>
                         </div>
                      <div>
                    </div>          
                </div>
              </Grid>
           </Grid>
            <CreateClients setClientsDoExist = {setClientsDoExist}/>
        </div>
    </div>
  )
}







LandingWithClients.propTypes = {
    classes: PropTypes.object.isRequired,
};


const styles = theme => (landingStyle(theme));
export default withStyles(styles)(LandingWithClients);
