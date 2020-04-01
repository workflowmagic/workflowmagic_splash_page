import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import parse from 'html-react-parser';
import clientWorkflowsStyle from '../../PageComponents/Workflows/style';



function WorkflowContent(props){

    const { classes, onClickAction, title, content } = props;
        
  return(   

     <Box className={classes.box}>
       <div className={classes.centerContainer}>
         <div className={classes.outerContainer}>
          <div className={classes.innerContentContainer}>
          <Button className={classes.showWorkflowList} onClick = {onClickAction}>BACK TO WORKFLOW LIST</Button>
            <h2 className={classes.workflowTextTitle}>{title}</h2>
              <div className={classes.innerTextContent}>
            
                { 
                  parse(content)
                }
           
              </div>
           </div>
          </div>
        </div>
     </Box>
    )
}



WorkflowContent.propTypes = {
    classes: PropTypes.object.isRequired,
};
const styles = (theme) => (clientWorkflowsStyle(theme));
export default withStyles(styles)(WorkflowContent);
