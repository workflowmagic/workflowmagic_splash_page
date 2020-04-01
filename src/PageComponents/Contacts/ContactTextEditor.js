import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from '../Loader';
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill from 'react-quill'; // ES6
import parse from 'html-react-parser';
import clientContactsStyle from '../../PageComponents/Contacts/style';




function ContactTextEditor(props){
      const {
      classes,
      onTitleChange,
      onSubmit,
      titlePlaceholder,
      title,
      bodyPlaceholder,
      onContentChange, 
      contentValue, 
      clientName,
      firstName,
      setFirstName,
      handleFirstNameChange,
      lastName,
      setLastName,
      handleLastNameChange,
      email,
      handleEmailChange,
      phoneNumber,
      handlePhoneNumberChange
    } = props 

    function convertTitleToFullName(string) {
        let name = string.split(' '); // retutrns ["Paul", "Steve", "Panakkal"]
        let firstName = name[0];
        let lastName = name.slice(1).join(" ");
        let contact = {
            firstName: firstName,
            lastName: lastName
        }
        return contact;
    }


   useEffect(()=>{
    const fullName = convertTitleToFullName(title);
    if(!firstName){
        setFirstName(fullName.firstName)
    }

    if(!lastName){
      setLastName(fullName.lastName)
    }


      
   },[])


    console.log(title)
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
              {/*
                <br/>

                <TextField className={classes.textEditorTitle}
                      onChange = {onTitleChange}
                      autoComplete = "off"
                      id="standard-dense"
                      label="Contact Title"
                      margin="normal"
                      variant="outlined"
                      placeholder="Type the contacts first and last name here"
                      type="text"
                      value={title}
                      name = "title"
                      inputProps={{ autoFocus: true}}

                />
                */}

                  <br/>


                <TextField className={classes.textEditorTitle}
                      onChange = {handleFirstNameChange}
                      autoComplete = "off"
                      autoFocus = "false"
                      id="standard-dense"
                      label="First Name"
                      margin="normal"
                      variant="outlined"
                      placeholder="Type the contacts first name here"
                      type="text"
                      value={firstName}
                      name = "firstname"
                      inputProps={{ autoFocus: true }}

                />

                  <br/>


                <TextField className={classes.textEditorTitle}
                      onChange = {handleLastNameChange}
                      autoComplete = "off"
                      autoFocus = "false"
                      id="standard-dense"
                      label="Last Name"
                      margin="normal"
                      variant="outlined"
                      placeholder="Type the contacts last name here"
                      type="text"
                      value={lastName}
                      name = "lastname"
                      inputProps={{ autoFocus: false }}

                />

                  <br/>

                <TextField className={classes.textEditorTitle}
                      onChange = {handleEmailChange}
                      autoComplete = "off"
                      autoFocus = "false"
                      id="standard-dense"
                      label="Email"
                      margin="normal"
                      variant="outlined"
                      placeholder="Type the contacts email here"
                      type="text"
                      value={email}
                      name = "email"
                      inputProps={{ autoFocus: false }}

                />

                
                <br/>



                <TextField className={classes.textEditorTitle}
                      onChange = {handlePhoneNumberChange}
                      autoComplete = "off"
                      inputProps={{ autoFocus: false }}
                      id="standard-dense"
                      label="Phone"
                      margin="normal"
                      variant="outlined"
                      placeholder="Type the contacts phone number here"
                      value={phoneNumber}
                      name = "phone"
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


ContactTextEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};
const styles = (theme) => (clientContactsStyle(theme));
export default withStyles(styles)(ContactTextEditor);

