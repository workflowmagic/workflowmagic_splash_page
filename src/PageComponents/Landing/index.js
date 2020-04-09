import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import "../../PageComponents/fonts/index.css";

import landingStyle from "../../PageComponents/Landing/style"
import { useMorph } from 'react-morph';
import SaveIcon from "@material-ui/icons/Save";


function Landing(props){



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
                        
                    <p className={classes.signInSignUpNoHover}>The simplest workflow management software in human history!</p>
                        <p className={classes.signInSignUpNoHover}>Coming Soon!</p>

               
                    <div>
                    </div>          
                </div>
              </Grid>
          </Grid>
          
    
        </div>
    </div>
  )
}







Landing.propTypes = {
    classes: PropTypes.object.isRequired,
};


const styles = theme => (landingStyle(theme));
export default withStyles(styles)(Landing);
