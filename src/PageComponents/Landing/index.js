import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import "../../PageComponents/fonts/index.css";
import CreateClients from "../../PageComponents/Landing/CreateClients";
import landingStyle from "../../PageComponents/Landing/style"
import { useMorph } from 'react-morph';
import SaveIcon from "@material-ui/icons/Save";
import db,{getAllClients, createClient, deleteClient,deleteCalendarEvent, getClientWorkflows,  deleteClientWorkflows, deleteClientCalendarEvents} from "./../../services/indexDB";


function Landing(props){

  const [clientsDoExist, setClientsDoExist] = useState(false);
  
  const morph = useMorph({spring: {
    damping: 26,
    mass: 1,
    stiffness: 180
  }});

  const { classes } = props;
  if(clientsDoExist){
    console.log("Clients do exist")
  }else{
    console.log("clients do NOT exist")
  }


 // deleteClientCalendarEvents("1").then((result)=>{
 //   console.log(result)
 //        return result
 //       })

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
                         {clientsDoExist &&  <div className={classes.callToActionContainer} {...morph}><h3 className={classes.yourAppIsReadyTitle}>Your app is ready!</h3>

                         <p className={classes.signInSignUpNoHover}>

                         To save your work click the <SaveIcon/>  icon or sign in. 
                         To get started click a client name that you entered below.
                         You can add as many clients as you want. Use the up and down arrows on your keyboard to make toggling faster!</p>
                         </div>}

                       
                        {!clientsDoExist && <div className={classes.callToActionContainer} {...morph}>
                        <h2 className={classes.tagline}>The simple way to organize your online gigs</h2> 
                        <h2 className={classes.tagline}>Workflow Magic is an online tool that helps small business owners, work from home employees and gig economy workers organize their client information</h2> 
                        <a className={classes.customAnchor}href="sign-in"><h3 className={classes.signInSignUp}>SignIn / SignUp</h3></a>
                        <p className={classes.signInSignUpNoHover}>NO?</p>
                        <h3 className={classes.signInSignUpNoHover}>THEN GET STARTED NOW!</h3>
                        </div>}

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







Landing.propTypes = {
    classes: PropTypes.object.isRequired,
};


const styles = theme => (landingStyle(theme));
export default withStyles(styles)(Landing);
