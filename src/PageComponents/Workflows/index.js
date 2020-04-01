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
import clientWorkflowsStyle from '../../PageComponents/Workflows/style';
import db,{getClientById, deleteWorkflow, createWorkflow, getClientWorkflows, updateWorkflow,checkIfWorkflowsOfClientExist}from "../.././services/indexDB";
import Context from "../.././services/context";
import restUrlToObject,{instantSearchWorkflowFilter} from '../.././helper_functions';



import WorkflowContent from '../../PageComponents/Workflows/WorkflowContent';
import WorkflowTextEditor from '../../PageComponents/Workflows/WorkflowTextEditor';




function Workflows(props) {
  const { classes } = props;

  // @Loader
  const [loadingBool, setloadingBool] = useState(true);

  // @These state handlers get client info
    let clientNameDefault = restUrlToObject(window.location.pathname)["client-name"];

  const [clientName, updateClientName] = useState(clientNameDefault );
  const [clientIDfromURL, setclientIDfromURL] = useState(); 
 


  // @These state handlers are used to toggle between component Views: workflow editing, workflow text creation and content display 
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showWorkflows, setShowWorkflows] = useState(true);
  const [showWorkflowContent, setShowWorkflowContent] = useState(false);
  function resetRenders(){
    setShowTextEditor(false);
    setShowWorkflows(false);
    setShowWorkflowContent(false);
 

  }


  // @These state handlers get and set workflow info
  const [selectedWorkflow, setSelectedWorkflow] = useState({title:"",content:"",client_id:"", id:""});
  const [editingWorkflow, setEditingWorkflow] = useState(false);
  const [workflowsList, updateWorkflowsList] = useState([]);
  const [workflowsQueryTrigger, setWorkflowsQueryTrigger] = useState(false);

  // Search workflows state 

  const [instantSearchedWorkflowList,setInstantSearchedWorkflowList] = useState([]);
  const inputRef = useRef();

  // Up/Down arrow selection state
  const [focus, setFocus] = useState(true);
  const [selectedWorkflowViaArrowKeypress,setSelectedWorkflowViaArrowKeypress] = useState(-1);
  const [workflowSearchedTitle, setWorkflowSearchedTitle] = useState("");

  // Text Editor Form cache data
  const [workflowCachedTitle, setWorkflowCachedTitle] = useState("");
  const [workflowCachedContent, setWorkflowCachedContent] = useState("");





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



  useEffect(() => {  //:::::::::::::::::::::::::::::::Get all workflows of the selected client per its ID
      getClientWorkflows(clientIDfromURL).then((workflowList)=>{
        //   workflows:"++id,client_id,content,title",

        updateWorkflowsList(workflowList);

        //@ If no workflows of client exist .. show the text editor to crreate a workflow
        checkIfWorkflowsOfClientExist(clientIDfromURL).then((workflowsExist)=>{  
               
           if(workflowsExist){
             resetRenders();
             setShowTextEditor(false);
             setShowWorkflows(true);
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

    
  }, [clientIDfromURL,workflowsQueryTrigger]);

  function selectWorkflowForContentDisplay(event,workflow){
    setSelectedWorkflow(workflow)
    resetRenders();
    setShowWorkflowContent(true)
  }




  // useEffect(()=>{
     
  //    resetRenders()
  //    if(context.state.showTextEditor){

  //      setShowTextEditor(context.state.showTextEditor) 

  //    }else{
  //      setShowWorkflows(true) 
  //    }

        
  // },[context.state.showTextEditor]);

  


  // useEffect(()=>{
  //    if(showTextEditor){
  //       context.setShowTextEditorVal(showTextEditor) 

  //    }

  // },[showTextEditor]);




  useEffect(()=>{
    setInstantSearchedWorkflowList(workflowsList)

        return ()=>{}
    
  },[workflowsList]);


    useEffect(() => {
        function handleKeyPress(event) {
           

           if(event.key === "Enter" && selectedWorkflowViaArrowKeypress !== -1){
      
               setSelectedWorkflowViaArrowKeypress(-1)
               showWorkflowContentViaEnterKeyPress()
                        setFocus(false)

           
           }


            if (event.key === "ArrowDown") {



                setSelectedWorkflowViaArrowKeypress((prev) => {

                    return instantSearchedWorkflowList.length - 1 === prev ? -1 : prev + 1;

                });

            }

            if (event.key === "ArrowUp") {

                setSelectedWorkflowViaArrowKeypress((prev) => {

                    return -1 === prev ? instantSearchedWorkflowList.length - 1 : prev - 1;

                });

            }

            if(event.key === "Enter" && showWorkflowContent){
                resetRenders();
                setShowWorkflows(true);

              
           
            }


      




        }

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }


    }, [workflowsList, instantSearchedWorkflowList, selectedWorkflowViaArrowKeypress,focus,showWorkflowContent]);





  // _____@sGross hack to get useRef to work on dynamically loaded component
  const [delayUseRef, setDelayUseRef] = useState(true);

  useEffect(()=>{
     if(showWorkflows){   // <--- Patch to fix error that appears when in other components
          
      if(selectedWorkflowViaArrowKeypress === -1 && !delayUseRef){
        inputRef.current.focus()
       }else if(selectedWorkflowViaArrowKeypress !== -1  && !delayUseRef){
         inputRef.current.blur()
       }else{

        setDelayUseRef(false)

       }

     }

     return ()=>{}
      
 
    },[inputRef,selectedWorkflowViaArrowKeypress,workflowsQueryTrigger])
  //_________________________________________________________________________




  //_________________________________________________________________________



  function removeWorkflow(event,val){
     deleteWorkflow(val.id).then((id)=>{
         setWorkflowsQueryTrigger("random trigger data " + Math.random());
     })
  }


  function selectWorkflowForEditing(event,workflow){
     
    resetRenders();
    setSelectedWorkflow(workflow);
    setWorkflowCachedTitle(workflow.title)
    setWorkflowCachedContent(workflow.content);
    setEditingWorkflow(true)
    setShowTextEditor(true);
    //context.setShowTextEditorVal(true);
    
  }

  function createWorkflowViaSearchForm(event){
    event.preventDefault()
    
    resetRenders();
    setWorkflowCachedTitle(workflowSearchedTitle);
    setEditingWorkflow(false);
    setShowTextEditor(true);
    setWorkflowSearchedTitle("");

  }

  

   // @Form typing and submission functions

  function clearForm(){
    setWorkflowCachedTitle("");
    setWorkflowCachedContent("");
  }
  
  function handleTitleChange(event){
      setWorkflowCachedTitle(event.target.value)
  }

  function handleContentChange(val){
      setWorkflowCachedContent(val)   
  }

  function submitWorkflow(event){
      event.preventDefault()
      let title = workflowCachedTitle;
      let content = workflowCachedContent;

      if(editingWorkflow){
        // get selectedWOrkflow.id, then update it via its ID
        const id = selectedWorkflow.id;
        updateWorkflow(id,workflowCachedTitle, workflowCachedContent).then((id)=>{
           clearForm()
           resetRenders();
           setShowWorkflows(true);
           setWorkflowsQueryTrigger(id + Math.random());
           //context.setShowTextEditorVal(false);
           setEditingWorkflow(false);



        })

      }else{

        createWorkflow(clientIDfromURL,title, content).then((id)=>{
          clearForm()
          resetRenders();
          setShowWorkflows(true);
          setWorkflowsQueryTrigger(id + Math.random());
          //context.setShowTextEditorVal(false);


        });

      }
}



function onChangeHandlerSearchWorkflow(e){
  e.preventDefault()

    setWorkflowSearchedTitle(e.target.value)
   
    setInstantSearchedWorkflowList(
        instantSearchWorkflowFilter(e.target.value.trim(),workflowsList)
    );

}


function onFocusHandler(){
    setFocus(true);
 }

function offFocusHandler(){
    setFocus(false);
 }


function showWorkflowContentViaEnterKeyPress(){

  const workflow = instantSearchedWorkflowList[selectedWorkflowViaArrowKeypress];
  setSelectedWorkflow(workflow);
  resetRenders();
  setShowWorkflowContent(true);
    
}



 useLayoutEffect(()=>{
  console.log(focus);
 })



  
  if(loadingBool){
    return <Loader/>
  }else{

      if(showWorkflows){

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

                             <form onSubmit = {function(e){createWorkflowViaSearchForm(e); setFocus(false)}}>
                     

                                 <TextField 
                                    onClick = {()=>{setSelectedWorkflowViaArrowKeypress(-1) }}
                                    className={classes.searchTextField}
                                    inputRef = {inputRef}
                                    onFocus = {onFocusHandler}
                                    onBlur = {offFocusHandler}
                                    onChange = {onChangeHandlerSearchWorkflow}
                                    autoComplete="off" 
                                    autoFocus = {focus}
                                    id="standard-dense" 
                                    label="WORKFLOW TITLE" 
                                    className={classes.textField} margin="normal" 
                                    variant="outlined" 
                                    placeholder="Search workflows" 
                                    type="text" name="workflows-search"
                                    value={workflowSearchedTitle}
                                    InputLabelProps={{
                                     shrink: true,
                                  }} />

                                 <br/>
                                 <Button variant="contained" type="submit" color="primary" className={classes.workflowButton}>ADD WORKFLOW</Button>

                             </form>

                      </div>

                          <ul className = {classes.workFlowsContainer}>
                            {
                              instantSearchedWorkflowList.map((val,index,arr)=>{
                       
                                  return (

                                    <div key={index}>  

                                    <Button className = {classes.editButton}   
                                    onClick={(event)=>selectWorkflowForEditing(event,val,index,arr)}>Edit</Button> 

                                             
                                  
                                      <ListItem className={

                                        selectedWorkflowViaArrowKeypress === index && !focus
                                            ? classes.workflowItemSelected
                                            : classes.workflowItem

                                         } 

                                       >

                                 
                                       <span className={classes.trashIconContainer} onClick={(event)=>removeWorkflow(event,val,index,arr)}>
                                            <IconButton className={classes.trashIcon} edge="end" aria-label="delete">
                                            <DeleteIcon />
                                            </IconButton>
                                        </span>


                                        <span className={classes.workflowTextContent}  onClick = {(event)=> selectWorkflowForContentDisplay(event,val,index,arr)}>
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

                      {/*<WorkflowsList
                         
                         classes={classes}
                         clientName = {clientName}
                         list = {instantSearchedWorkflowList}
                         onDeleteClick= {removeWorkflow}
                         onItemClick = {selectWorkflowForContentDisplay}
                         onEditClick={selectWorkflowForEditing}
                         selectedByIndex = {selectedWorkflowViaArrowKeypress}
                         onFocus = {onFocusHandler}
                         onBlur= {offFocusHandler}
                         inputRef = {inputRef}
                         value={workflowSearchedTitle}
                         focus = {focus}
                      /> */}

                  </Grid>
                </Grid>
              </div>
            </div>
    
        )
      }

      if(showWorkflowContent){
        return (
          <div className = {classes.bgImage}> 
            <div className={classes.root}>
              <Grid container>
                <Grid item xs={12}>
                  <WorkflowContent  title={selectedWorkflow.title} content={selectedWorkflow.content} onClickAction={()=>{
                    resetRenders();
                    setShowWorkflows(true);
                  
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
                  <WorkflowTextEditor
                classes = {classes}
                onSubmit= {submitWorkflow}
                titleValue = {workflowCachedTitle}
                onTitleChange = {handleTitleChange}
                titlePlaceholder="Type the name of the workflow here"
                //____________________________________________________React Quill 
                bodyPlaceholder = 'Type the name and description of a workflow in this form. A workflow is a note that helps you to remember the details of something that you need to know for the client. You write things like "How to invoice" and describe the steps to accomplish the task. To create a workflow for a different client you need to go back to the clients page, enter the clients name and click it.'
                onContentChange = {(val)=>handleContentChange(val)}
                contentValue={workflowCachedContent}
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







Workflows.propTypes = {
    classes: PropTypes.object.isRequired,
};
const styles = (theme) => (clientWorkflowsStyle(theme));
export default withStyles(styles)(Workflows);