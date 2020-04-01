import React, {useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from '../Loader';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Box from '@material-ui/core/Box';
import 'react-quill/dist/quill.snow.css'; // ES6
import clientContactsStyle from '../../PageComponents/Contacts/style';
import db,{getClientById, deleteContact, createContact, getClientContacts, updateContact,checkIfContactsOfClientExist}from "../.././services/indexDB";
import Context from "../.././services/context";
import restUrlToObject,{instantSearchContactFilter} from '../.././helper_functions';



import ContactContent from '../../PageComponents/Contacts/ContactContent';
import ContactTextEditor from '../../PageComponents/Contacts/ContactTextEditor';


//

function Contacts(props) {
  const { classes } = props;

  // @Loader
  const [loadingBool, setloadingBool] = useState(true);

  // @These state handlers get client info
    let clientNameDefault = restUrlToObject(window.location.pathname)["client-name"];

  const [clientName, updateClientName] = useState(clientNameDefault );
  const [clientIDfromURL, setclientIDfromURL] = useState(); 
 


  // @These state handlers are used to toggle between component Views: contact editing, contact text creation and content display 
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showContacts, setShowContacts] = useState(true);
  const [showContactContent, setShowContactContent] = useState(false);
  function resetRenders(){
    setShowTextEditor(false);
    setShowContacts(false);
    setShowContactContent(false);
 

  }


  // @These state handlers get and set contact info
  const [selectedContact, setSelectedContact] = useState(undefined);
  const [editingContact, setEditingContact] = useState(false);
  const [contactsList, updateContactsList] = useState([]);
  const [contactsQueryTrigger, setContactsQueryTrigger] = useState(false);

  const [title,setTitle] = useState("");
  const [fullName, setFullName] = useState(""); 
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  // Search contacts state 

  const [instantSearchedContactList,setInstantSearchedContactList] = useState([]);
  const inputRef = useRef();

  // Up/Down arrow selection state
  const [focus, setFocus] = useState(true);
  const [selectedContactViaArrowKeypress,setSelectedContactViaArrowKeypress] = useState(-1);
  const [contactSearchedTitle, setContactSearchedTitle] = useState("");

  // Text Editor Form cache data
  const [contactCachedTitle, setContactCachedTitle] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");


  //_________________________________________________________________________________


  useEffect(() => {//::::::::::::::::::::::::::::::::Get client id from url

      let clientData = restUrlToObject(window.location.pathname);
      console.log(clientData)

      let clientID = parseInt(clientData.client);

      setclientIDfromURL(clientID);

          return ()=>{}

  }, []);



  // useEffect(()=>{    //::::::::::::::::::::::::::::::::Get name of client  
  //     getClientById(clientIDfromURL).then((client)=>{
  //       console.log(client)
  //       updateClientName(client["client-name"])

  //     });

  //         return ()=>{}

  // },clientIDfromURL);



  useEffect(() => {  //:::::::::::::::::::::::::::::::Get all contacts of the selected client per its ID
      getClientContacts(clientIDfromURL).then((contactList)=>{
        //   contacts:"++id,client_id,content,title",

        updateContactsList(contactList);

        //@ If no contacts of client exist .. show the text editor to crreate a contact
        checkIfContactsOfClientExist(clientIDfromURL).then((contactsExist)=>{  
               
           if(contactsExist){
             resetRenders();
             setShowTextEditor(false);
             setShowContacts(true);
             // context.setShowTextEditorVal(showTextEditor) 

           }else{
             resetRenders();
             setShowTextEditor(true);

           }
        })


    }).finally(()=>{
         setTimeout(()=>{
             setloadingBool(false);
         },500);
    });

        return ()=>{}

    
  }, [clientIDfromURL,contactsQueryTrigger]);

  function selectContactForContentDisplay(event,contact){
    setSelectedContact(contact)
    resetRenders();
    setShowContactContent(true)
  }




  // useEffect(()=>{
     
  //    resetRenders()
  //    if(context.state.showTextEditor){

  //      setShowTextEditor(context.state.showTextEditor) 

  //    }else{
  //      setShowContacts(true) 
  //    }

        
  // },[context.state.showTextEditor]);

  


  // useEffect(()=>{
  //    if(showTextEditor){
  //       context.setShowTextEditorVal(showTextEditor) 

  //    }

  // },[showTextEditor]);




  useEffect(()=>{
    setInstantSearchedContactList(contactsList)

        return ()=>{}
    
  },[contactsList]);


    useEffect(() => {
        function handleKeyPress(event) {
           

           if(event.key === "Enter" && selectedContactViaArrowKeypress !== -1){
      
               setSelectedContactViaArrowKeypress(-1)
               showContactContentViaEnterKeyPress()
                        setFocus(false)

           
           }


            if (event.key === "ArrowDown") {



                setSelectedContactViaArrowKeypress((prev) => {

                    return instantSearchedContactList.length - 1 === prev ? -1 : prev + 1;

                });

            }

            if (event.key === "ArrowUp") {

                setSelectedContactViaArrowKeypress((prev) => {

                    return -1 === prev ? instantSearchedContactList.length - 1 : prev - 1;

                });

            }

            if(event.key === "Enter" && showContactContent){
                resetRenders();
                setShowContacts(true);

              
           
            }


      




        }

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }


    }, [contactsList, instantSearchedContactList, selectedContactViaArrowKeypress,focus,showContactContent]);





  // _____@sGross hack to get useRef to work on dynamically loaded component
  const [delayUseRef, setDelayUseRef] = useState(true);

  useEffect(()=>{
     if(showContacts){   // <--- Patch to fix error that appears when in other components
          
      if(selectedContactViaArrowKeypress === -1 && !delayUseRef){
        inputRef.current.focus()
       }else if(selectedContactViaArrowKeypress !== -1  && !delayUseRef){
         inputRef.current.blur()
       }else{

        setDelayUseRef(false)

       }

     }

     return ()=>{}
      
 
    },[inputRef,selectedContactViaArrowKeypress,contactsQueryTrigger])
  //_________________________________________________________________________

  useEffect(()=>{
    let fullName = firstName + " " + lastName;
    setTitle(fullName)

  },[firstName,lastName])


  //_________________________________________________________________________



  function removeContact(event,val){
     deleteContact(val.id).then((id)=>{
         setContactsQueryTrigger("random trigger data " + Math.random());
     })
  }


  function selectContactForEditing(event,contact){
    console.log(contact)
     
    resetRenders();
    setSelectedContact(contact);
    setTitle(contact.title)
    setAdditionalInformation(contact["additional_information"]);


     setFirstName(contact["first_name"])
     setLastName(contact["last_name"])
     setEmail(contact.email)
     setPhoneNumber(contact["phone_number"])
     setEditingContact(true)
     setShowTextEditor(true);
      //context.setShowTextEditorVal(true);
    
  }

  function createContactViaSearchForm(event){
    event.preventDefault()
    setTitle(contactSearchedTitle)
    resetRenders();
    setContactCachedTitle(contactSearchedTitle);
    setEditingContact(false);
    setShowTextEditor(true);
    setContactSearchedTitle("");

  }

  

   // @Form typing and submission functions

  function clearForm(){
    setContactCachedTitle("");
    setAdditionalInformation("");
    setTitle("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
  }
  
  function handleTitleChange(event){
      setTitle(event.target.value)
  }


  function handleFirstNameChange(event){
      setFirstName(event.target.value)
   
  }

  function handleLastNameChange(event){
      setLastName(event.target.value)

  }
  
  function handleEmailChange(event){
      setEmail(event.target.value)
  }

  function handlePhoneNumberChange(event){
      setPhoneNumber(event.target.value)
  }




  function handleContentChange(val){
      setAdditionalInformation(val)   
  }

  function submitContact(event){
      event.preventDefault()
      // let title = contactCachedTitle;
      // let content = additionalInformation;
console.log(title)

      console.log(editingContact + " weeeee")

      if(editingContact){
        // get selectedWOrkflow.id, then update it via its ID
        const id = selectedContact.id;
        updateContact(id,clientIDfromURL,title, firstName,lastName,email,phoneNumber,additionalInformation).then((id)=>{
           clearForm()
           resetRenders();
           setShowContacts(true);
           setContactsQueryTrigger(id + Math.random());
           //context.setShowTextEditorVal(false);
           setEditingContact(false);

        })

      }else{

        createContact(clientIDfromURL,title, firstName,lastName,email,phoneNumber,additionalInformation).then((id)=>{
          clearForm()
          resetRenders();
          setShowContacts(true);
          setContactsQueryTrigger(id + Math.random());
          //context.setShowTextEditorVal(false);
        });

      }
}



function onChangeHandlerSearchContact(e){
  e.preventDefault()

    setContactSearchedTitle(e.target.value)
   
    setInstantSearchedContactList(
        instantSearchContactFilter(e.target.value.trim(),contactsList)
    );

}


function onFocusHandler(){
    setFocus(true);
 }

function offFocusHandler(){
    setFocus(false);
 }


function showContactContentViaEnterKeyPress(){

  const contact = instantSearchedContactList[selectedContactViaArrowKeypress];
  setSelectedContact(contact);
  resetRenders();
  setShowContactContent(true);
    
}



 useLayoutEffect(()=>{
  console.log(focus);
 })



  
  if(loadingBool){
    return <Loader/>
  }else{

      if(showContacts){

        return (
           <div className = {classes.bgImage}> 
              <div className={classes.root}>
                <Grid container>
                  <Grid item xs={12}>

                   <Box>

                      <div className={classes.listContainer}>

                        <div className = {classes.clientTitleContainer}>
                  <h1 className="logoFontContainerDashboard">
                          Workflow Magic
                      </h1>
                        <h1 className="clientFontContainer">
                            {decodeURI(clientNameDefault)}
                      </h1>
                       </div>
                       <div className={classes.formContainer}>

                             <form onSubmit = {function(e){createContactViaSearchForm(e); setFocus(false)}}>
                     

                                 <TextField 
                                    onClick = {()=>{setSelectedContactViaArrowKeypress(-1) }}
                                    className={classes.searchTextField}
                                    inputRef = {inputRef}
                                    onFocus = {onFocusHandler}
                                    onBlur = {offFocusHandler}
                                    onChange = {onChangeHandlerSearchContact}
                                    autoComplete="off" 
                                    autoFocus = {focus}
                                    id="standard-dense" 
                                    label="CONTACT TITLE" 
                                    className={classes.textField} margin="normal" 
                                    variant="outlined" 
                                    placeholder="Search contacts" 
                                    type="text" name="contacts-search"
                                    value={contactSearchedTitle}
                                    InputLabelProps={{
                                     shrink: true,
                                  }} />

                                 <br/>
                                 <Button variant="contained" type="submit" color="primary" className={classes.contactButton}>ADD CONTACT</Button>

                             </form>

                      </div>

                          <ul className = {classes.workFlowsContainer}>
                            {
                              instantSearchedContactList.map((val,index,arr)=>{
                       
                                  return (

                                    <div key={index}>  

                                    <Button className = {classes.editButton}   
                                    onClick={(event)=>selectContactForEditing(event,val,index,arr)}>Edit</Button> 

                                             
                                  
                                      <ListItem className={

                                        selectedContactViaArrowKeypress === index && !focus
                                            ? classes.contactItemSelected
                                            : classes.contactItem

                                         } 

                                       >

                                 
                                       <span className={classes.trashIconContainer} onClick={(event)=>removeContact(event,val,index,arr)}>
                                            <IconButton className={classes.trashIcon} edge="end" aria-label="delete">
                                            <DeleteIcon />
                                            </IconButton>
                                        </span>


                                        <span className={classes.contactTextContent}  onClick = {(event)=> selectContactForContentDisplay(event,val,index,arr)}>
                                          {val.title}
                                          <br/>
                                       

                                          <div className = {classes.contactContent} >
                                          email: {val.email}
                                          </div>

                                          <div className = {classes.contactContent} >
                                          phone: {val.phone_number}
                                          </div>
                                        </span>
                                 



                                       {/*<span className={classes.calendarIconContainer} onClick={alert}>
                                            <IconButton className={classes.calendarIcon} edge="end" aria-label="delete">
                                            <EventNoteIcon/>
                                            </IconButton>
                                        </span>
                                      */}


                                      </ListItem>  
                                      <hr/>
                              
                                    </div>
                                  )
                              })
                            }
                            </ul>
                        </div>
                    </Box>

                      {/*<ContactsList
                         
                         classes={classes}
                         clientName = {clientName}
                         list = {instantSearchedContactList}
                         onDeleteClick= {removeContact}
                         onItemClick = {selectContactForContentDisplay}
                         onEditClick={selectContactForEditing}
                         selectedByIndex = {selectedContactViaArrowKeypress}
                         onFocus = {onFocusHandler}
                         onBlur= {offFocusHandler}
                         inputRef = {inputRef}
                         value={contactSearchedTitle}
                         focus = {focus}
                      /> */}

                  </Grid>
                </Grid>
              </div>
            </div>
    
        )
      }

      if(showContactContent){
        return (
          <div className = {classes.bgImage}> 
            <div className={classes.root}>
              <Grid container>
                <Grid item xs={12}>
                  <ContactContent  selectedContact = {selectedContact} onClickAction={()=>{
                    resetRenders();
                    setShowContacts(true);
                  
                  }}/>
                </Grid>
              </Grid>
            </div>
          </div>  
        )
      }


       if(showTextEditor){
        return (
          <div className = {classes.bgImage}> 
            <div className={classes.root}>
              <Grid container>
                 <Grid item xs={12}>
                  <ContactTextEditor
                classes = {classes}
                onSubmit= {submitContact}
                title= {title}
                onTitleChange = {handleTitleChange}
                titlePlaceholder="Type the name of the contact here"
                firstName ={firstName}
                setFirstName = {setFirstName}
                handleFirstNameChange = {handleFirstNameChange}
                lastName = {lastName}
                setLastName = {setLastName}
                handleLastNameChange = {handleLastNameChange}
                email = {email}
                handleEmailChange = {handleEmailChange}
                phoneNumber = {phoneNumber}
                handlePhoneNumberChange = {handlePhoneNumberChange}



                //____________________________________________________React Quill 
                bodyPlaceholder = 'Type additional information about the contact in this form. You write things like "is project manager" or "is an assistant to the CEO".'
                onContentChange = {(val)=>handleContentChange(val)}
                contentValue={additionalInformation}
                clientName = {clientName}
              />


              </Grid>
              </Grid>
            </div>
          </div>  
        )

      }

      return (<div> all false </div>)

  }

}







Contacts.propTypes = {
    classes: PropTypes.object.isRequired,
};
const styles = (theme) => (clientContactsStyle(theme));
export default withStyles(styles)(Contacts);