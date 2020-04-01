import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import {instantSearchFilter} from '../../../helper_functions';
import "../../../PageComponents/fonts/index.css";
import db,{getAllClients,deleteClientContacts, createClient, deleteClient, getClientWorkflows,  deleteClientWorkflows,deleteClientCalendarEvents} from "../../../services/indexDB";
import createClientsStyle from "../../../PageComponents/Landing/CreateClients/style";
import { useMorph } from 'react-morph';

//____________________________________


function trimString(str){
  return  str.trim();
}

//___________________________________


function CreateClients(props) {


    //____client state
    const [clientList,setClientList] = useState([]);
    const [focus, setFocus] = useState(true);
    const [instanSearchedClientList,setInstanSearchedClientList] = useState([]);
    const [clientNameInForm, setClientNameInForm] = useState("");
    const [clientListUseEffectTrigger, clientListUseEffectTriggerFunk] = useState(0);
    const [selectedClientViaArrowKeypress,setSelectedClientViaArrowKeypress] = useState(-1);
    const [showCalendar, setShowCalendar] = useState(false)
    const inputRef = useRef();

  //_________________________________________BEGIN Listener ... anytime IndexDB changes we update our entire useState() collection(s)

  useEffect(()=>{

    getAllClients().then((clients)=>{
      setClientList(clients)
    });

  },[clientListUseEffectTrigger]);


  //_________________________________________END Listener

  useEffect(()=>{

     if(clientList.length){
       props.setClientsDoExist(true)
     }else{
        props.setClientsDoExist(false)
     }

  },[clientList]);


  useEffect(()=>{

    setInstanSearchedClientList(clientList);
    
  },[clientList]);



   // @ Arrow Up/Down selection. 
  useEffect(() => {
      function handleKeyPress(event){

      
        if(event.key === "ArrowDown"){
           setSelectedClientViaArrowKeypress((prev)=>{
        
                return instanSearchedClientList.length  - 1 === prev ? -1 : prev + 1;
                
           });
               
        }

        if(event.key === "ArrowUp"){
       
           setSelectedClientViaArrowKeypress((prev)=>{

                  return -1 === prev ? instanSearchedClientList.length - 1 : prev - 1;
                 
           });
               
        }

        if(event.key === "Enter" && !focus){
          const client = instanSearchedClientList[selectedClientViaArrowKeypress];

          window.location.href = `/client/${client.id}/client-name/${client.name}/dashboard`;
       
        }

      }


       document.addEventListener('keydown', handleKeyPress)
       return () => {
         document.removeEventListener('keydown', handleKeyPress)
       }

  },[clientList,instanSearchedClientList,selectedClientViaArrowKeypress,focus]);




  useEffect(()=>{

      if(selectedClientViaArrowKeypress === -1){
        inputRef.current.focus()
       }else{
        inputRef.current.blur()
       }
 
    },[inputRef,selectedClientViaArrowKeypress])





  //_________________________________________________

  useLayoutEffect(()=>{
    console.log(instanSearchedClientList[selectedClientViaArrowKeypress])
  })


  

  function addClientToIndexDB(event){
        event.preventDefault();

        let clientNameInFormTrimmed = trimString(clientNameInForm); // Check if form is empty

        if(clientNameInFormTrimmed){

            createClient(clientNameInFormTrimmed).then((id)=>{
               clientListUseEffectTriggerFunk(id + Math.random());    // Math.random is used to insure that trigger always fires. No other reason.
               setClientNameInForm("");

            });

        }else{
          alert("Form can not be empty")
        }
       
  }

  

  function deleteClientFromIndexDB(event,id){
        
         console.log(id)
       deleteClientWorkflows(id).then((result)=>{
        return result
       })

        deleteClientContacts(id).then((result)=>{
        return result
       })


      
       deleteClientCalendarEvents(id + "").then((result) => {
           console.log(result)
           return result
       })

 
      deleteClient(id).then((result)=>{


          clientListUseEffectTriggerFunk(id + Math.random())  // Math.random is used to insure that trigger always fires. No other reason.
      });




   }



  //@ Instant Search Listener
  function handleChangeWithInstantSearch(evt){

    setClientNameInForm(evt.target.value);

    setInstanSearchedClientList(
        instantSearchFilter(evt.target.value.trim(),clientList)
    );

  }

 function onFocusHandler(){
    setFocus(true);
 }

 function offFocusHandler(){
    setFocus(false);

 }

 useLayoutEffect(()=>{
  console.log(focus);
 })

 function displayCalendar(){
  if(showCalendar){
    return <div> Calendar </div>
  }else{
    return <div> No fucker </div>
  }
 }


  const { classes } = props;

   return (
          
      <div className={classes.root}>
      
          <Grid lg={12}>
              <div className={classes.container}>
              
                  <form onSubmit={(event)=>{addClientToIndexDB(event)}}>
                      <TextField 

                        inputRef = {inputRef}
                        onChange={handleChangeWithInstantSearch}
                        value={clientNameInForm}
                        onFocus = {onFocusHandler}
                        onBlur= {offFocusHandler}
                        autoComplete="off" 
                        id="standard-dense" 
                        label="CLIENT NAME" 
                        className={classes.textField} margin="normal" 
                        variant="outlined" 
                        placeholder="Type the name of a client or company that you work with" 
                        type="text" name="client-name" 
                        autoFocus = "true"
                        InputLabelProps={{
                         shrink: true,
                      }} />

                      <br />
                      <Button variant="contained" type="submit" color="primary" className={classes.clientButton}>CREATE CLIENT</Button>

                  </form>

                      <Grid item xs={12} sm={12}>


                  <ul>
                      {instanSearchedClientList.map((val,index)=>{
                          return  (
                          <div key={index}>
                     
                          <ListItem key={index} className={
                              selectedClientViaArrowKeypress === index
                              ? classes.clientItemSelected
                              : classes.clientItem
                          }>

                              <span className={classes.trashIconContainer} onClick={(event)=>deleteClientFromIndexDB(event,val.id)}>
                                 <IconButton className={classes.trashIcon} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                 </IconButton>
                              </span>


                            <a href={`/client/${val.id}/client-name/${val.name}/dashboard`} className={classes.clientItemLink}>
                             {val.name} 
                            </a>
                          

                            </ListItem>
                            <hr/>
                        
                            </div>
                       
                            )
                      })}
                      
                  </ul>

               </Grid>
            </div>
        </Grid>
            
      </div>

    );
}



CreateClients.propTypes = {
  classes: PropTypes.object.isRequired
}


const styles = (theme)=>(createClientsStyle(theme));

export default withStyles(styles)(CreateClients)


/*

DOCUMENTATION

Landing:  allows users to create, delete and view Clients.

When the page loads: useEffect loads all clients from IndexedDB via getAllClients(). getAllClients() is available
at indexDB/index.js.

Every time a user adds or deletes a client a useState function named clientListUseEffectTriggerFunk() is invoked. useEffect is listening for this STATE CHANGE
and in turn on each addClient or deleteClient request a call to indexedDB is made to re-populate clientList.


*/