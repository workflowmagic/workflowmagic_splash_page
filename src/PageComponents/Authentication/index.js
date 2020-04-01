import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import authenticationStyle from "../../PageComponents/Authentication/style"
import SaveIcon from "@material-ui/icons/Save";



function Authentication(props){

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
                  <div className={classes.message}>
                  <p>This is a premium feature and is not yet available. </p>
                 <p> To save your work please click the   <SaveIcon/>   icon. </p>
                  </div>

              </Grid>
          </Grid>
        
        </div>
    </div>
  )
}



Authentication.propTypes = {
    classes: PropTypes.object.isRequired,
};


const styles = theme => (authenticationStyle(theme));
export default withStyles(styles)(Authentication);
