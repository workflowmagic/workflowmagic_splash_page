import React,{useState,useEffect,useRef} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import db,{getAllClients, createClient, deleteClient} from "../../services/indexDB";
import REST from "../../services/rest";
import style from "../../PageComponents/Calendar/style";
import {instantSearchFilter} from '../../helper_functions';


function SearchClients(props){

	const {classes,setSelectedClient,openCreateEventModal,redirectToWorkflows,modalOpenEditEvent,modalOpenCreateEvent} = props
    const [clientList, setClientList] = useState([]);
    const [instanSearchedClientList,setInstanSearchedClientList] = useState([]);
    const [clientNameInForm, setClientNameInForm] = useState([]);
    const [selectedClientViaArrowKeypress,setSelectedClientViaArrowKeypress] = useState(-1);
    const inputRef = useRef();
    const containerRef = useRef(null);
    const [focus, setFocus] = useState(true);

    useEffect(() => { // @Get all clients
	      getAllClients().then((clients)=>{
	          setClientList(clients)
	      })
    },[]);


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

        if(event.key === "Enter" && !focus){   // && modal NOT open
     
        


          const client = instanSearchedClientList[selectedClientViaArrowKeypress];

          // openmodal and pass in info
            // alert(modalOpenCreateEvent)


                                 // setSelectedClient(()=>{
                                 //  openCreateEventModal(event,client)
                                 //  return client
                                 // })

       
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





  function handleChangeWithInstantSearch(evt){

    setClientNameInForm(evt.target.value);

    setInstanSearchedClientList(
        instantSearchFilter(evt.target.value.trim(),clientList)
    );

  }

   function onFocusHandler() {
       setFocus(true);
   }

   function offFocusHandler() {
       setFocus(false);

   }



    return(
    	<div ref={containerRef}>
           <form className={classes.searchForm}>
                  <TextField 
                   inputRef = {inputRef}
                      onChange = {handleChangeWithInstantSearch}
                      value={clientNameInForm}
                      autoComplete = "off"
                      id="standard-dense"
                      label="CLIENT NAME"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      placeholder="SEARCH CLIENT LIST"
                      type="text"
                      onFocus = {onFocusHandler}
                      onBlur= {offFocusHandler}
                      name = "client-list"
                      autoFocus = "true"
                      InputLabelProps={{
                       shrink: true,
                      }}
                  />

                  <br/>
              </form>
          



              <List className={classes.listContainer}> 
                             
                    {
                       instanSearchedClientList.map((val,index)=>{
                  
                          return (
                            <div key={index} className = {classes.clientItemContainer}>
                               <ListItem onClick={(event)=>{
                                 setSelectedClient(()=>{
                                  openCreateEventModal(event,val)
                                  return val
                                 })

                               }}  alignItems="center" className = { selectedClientViaArrowKeypress === index

                                ? classes.clientItemSelected
                                : classes.clientItem}>

                              {val.name}

                              </ListItem>
                               <Button className={classes.clientButton} onClick={alert} variant="contained" color="primary">Show Only</Button>
                               <Button className={classes.clientButton}  onClick={()=>redirectToWorkflows(val)} variant="contained" color="primary">Workflows</Button>
                               <hr/>
                            </div>
                          );
                       })
                     }

              </List>
        </div>
    )

}


SearchClients.propTypes = {
    classes: PropTypes.object.isRequired,
};
const styles = theme => (style(theme));
export default withStyles(styles)(SearchClients);



{/*


              <form className={classes.searchForm}>
                  <TextField 
                      onChange = {(event)=>instantSearchHandler(event)}
                      value="search"
                      autoComplete = "off"
                      id="standard-dense"
                      label="CLIENT NAME"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      placeholder="SEARCH CLIENT LIST"
                      type="text"
                      name = "client-list"
                      InputLabelProps={{
                       shrink: true,
                     }}
                  />

                  <br/>
              </form>



              <List className={classes.listContainer}> 
                             
                    {
                       clientList.map((val,index)=>{
                  
                          return (
                            <div key={index} className = {classes.clientItemContainer}>
                               <ListItem onClick={(event)=>{
                                 setSelectedClient(()=>{
                                  openCreateEventModal(event,val)
                                  return val
                                 })


                                
                                console.log(val)
                               
                                
                               }}  alignItems="center" className={classes.listItemCenter}>{val.name}</ListItem>

                               <Button onClick={alert} variant="contained" color="primary">Show Only</Button>

                               <Button onClick={()=>redirectToWorkflows(val)} variant="contained" color="primary">Workflows</Button>
                            </div>
                          );
                          
                       })
                     }

              </List>


*/}