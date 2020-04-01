import React, {useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import 'react-quill/dist/quill.snow.css'; // ES6
import clientContactsStyle from '../../PageComponents/Contacts/style';
import EventNoteIcon from '@material-ui/icons/EventNote';





// useRef and index value of selected contactViaArrowKeypress

function ContactsList(props){
  const { classes,   
          clientName, 
          list,
          onDeleteClick,
          onEditClick,
          onItemClick,
          test,
          selectedByIndex,



        } = props;


const inputRef = useRef();
const [focus, setFocus] = useState(false)

 function onFocusHandler(){
    setFocus(true);
 }





  useEffect(()=>{

       if(selectedByIndex === -1 || focus){
        inputRef.current.focus()
       }else{
         
        inputRef.current.blur()
       
       }
 
    },[selectedByIndex]);

useLayoutEffect(()=>{
  console.log()
})

function makeChange(e){
   test(e)
}

  return (
      <Box>

        <div className={classes.listContainer}>

          <div className = {classes.clientTitleContainer}>
            <h2 className={classes.clientName}>{clientName}</h2>


               <form>
       

                     <TextField 
                    
               
                        className={classes.searchTextField}
        
                      onFocus = {onFocusHandler}
                      onChange = {(e)=>makeChange(e)}
                        inputRef ={inputRef }
                        autoComplete="off" 
                        id="standard-dense" 
                        label="CLIENT NAME" 
                        className={classes.textField} margin="normal" 
                        variant="outlined" 
                        placeholder="Search contacts" 
                        type="text" name="contacts-search" 
                        InputLabelProps={{
                         shrink: true,
                      }} />

                 </form>

            </div>

            <ul className = {classes.workFlowsContainer}>
              {
                list.map((val,index,arr)=>{
         
                    return (

                      <div key={index}>  

                      <Button className = {classes.editButton}   onClick={(event)=>onEditClick(event,val,index,arr)}>Edit</Button> 
    
                               
                    
                        <ListItem className={

                          selectedByIndex === index
                              ? classes.contactItemSelected
                              : classes.contactItem

                           } 

                         >

                   
                         <span className={classes.trashIconContainer} onClick={(event)=>onDeleteClick(event,val,index,arr)}>
                              <IconButton className={classes.trashIcon} edge="end" aria-label="delete">
                              <DeleteIcon />
                              </IconButton>
                          </span>


                          <span  onClick = {(event)=>onItemClick(event,val,index,arr)}>
                            {val.title}
                          </span>
                   



                         <span className={classes.calendarIconContainer} onClick={alert}>
                              <IconButton className={classes.calendarIcon} edge="end" aria-label="delete">
                              <EventNoteIcon/>
                              </IconButton>
                          </span>


                        </ListItem>  
                        <hr/>
                
                      </div>
                    )
                })
              }
            </ul>
        </div>
    </Box>

  )
}


ContactsList.propTypes = {
    classes: PropTypes.object.isRequired,
};
const styles = (theme) => (clientContactsStyle(theme));
export default withStyles(styles)(ContactsList);