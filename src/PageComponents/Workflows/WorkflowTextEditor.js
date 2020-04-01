import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from '../Loader';
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill from 'react-quill'; // ES6
import parse from 'html-react-parser';
import clientWorkflowsStyle from '../../PageComponents/Workflows/style';




function WorkflowTextEditor(props){
    const {classes,onTitleChange,onSubmit,titlePlaceholder,titleValue,bodyPlaceholder,onContentChange, contentValue, clientName} = props 
    return(
          <div>
            <div className={classes.instructionNote}>
      

          </div>
           <div className={classes.centerContainer}>

                     <div className = {classes.clientTitleContainer}>
            <h2 className={classes.clientName}>{decodeURI(clientName)}</h2>
            </div>

            <div className={classes.outerContainer}>
              <div className={classes.innerTextEditorContainer}>     
                <form onSubmit = {onSubmit}>
              
                <br/>

                <TextField className={classes.textEditorTitle}
                      onChange = {onTitleChange}
                      autoComplete = "off"
                      autoFocus = "true"
                      id="standard-dense"
                      label="Workflow Title"
                      margin="normal"
                      variant="outlined"
                      placeholder={titlePlaceholder}
                      type="text"
                      value={titleValue}
                      name = "cachedWorkflowTitle"
                />

                  <br/>

                  

                  <ReactQuill style={{}} placeholder= {bodyPlaceholder} onChange = {onContentChange} value={contentValue} theme="snow" style={{

                    height:"300px",
                    padding:"20px",
                    lineHeight:"0px",
                    fontSize:"100px"
                 
                  }}/> 


                  <Button  className={classes.textButton} type="submit">SUBMIT</Button>

                {/*  <Button  className={classes.cancelButton} type="submit">CANCEL</Button>  */}

                </form>
               </div>
              </div>
            </div>   
          </div>
    );
};


WorkflowTextEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};
const styles = (theme) => (clientWorkflowsStyle(theme));
export default withStyles(styles)(WorkflowTextEditor);

