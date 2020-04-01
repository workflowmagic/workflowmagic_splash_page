import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import dashboardStyle from "../../PageComponents/Dashboard/style"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {restUrlToObject} from '../../helper_functions';
// get client id from URL
// get name
// 

function Dashboard(props){
	const {classes} = props;
  
  const [selectedItemViaArrowKeypress,setSelectedItemViaArrowKeypress] = useState(-1);

  const [items, setItems] = useState(
       [
         {title:"Workflows",link:"/workflows", description:"Your personalized client documentation"},
         {title:"Contacts",description:"A list of the clients coworkers and customers",link:"/contacts"},
         {title:"Calendar",description:"Your calendar to schedule events for the client",link:"/calendar"}
       ]
     )


	let clientNameDefault = restUrlToObject(window.location.pathname)["client-name"];


	const [clientName,setClientName] = useState(clientNameDefault);





  //____________________________________________

     // @ Arrow Up/Down selection. 
  useEffect(() => {
      function handleKeyPress(event) {


          if (event.key === "ArrowDown") {
              setSelectedItemViaArrowKeypress((prev) => {

                  return items.length - 1 === prev ? -1 : prev + 1;

              });

          }

          if (event.key === "ArrowUp") {

              setSelectedItemViaArrowKeypress((prev) => {

                  return -1 === prev ? items.length - 1 : prev - 1;

              });

          }

          if (event.key === "Enter") {

            if(selectedItemViaArrowKeypress === -1){
               // do nothing
            
            }else{
                  window.location.href = window.location.pathname + items[selectedItemViaArrowKeypress]["link"];
            }

          }

      }


      document.addEventListener('keydown', handleKeyPress)
      return () => {
          document.removeEventListener('keydown', handleKeyPress)
      }

  }, [items, selectedItemViaArrowKeypress]);








  //____________________________________________

	return (
               
      <div className={classes.root}>
      
              <div className={classes.container}>
              
                  <Grid item xs={12} sm={12}>
				            	<div className={classes.interactionContainer}>
                      <h1 className="logoFontContainerDashboard">
                          Workflow Magic
                      </h1>
                        <h1 className="clientFontContainer">
                            {decodeURI(clientNameDefault)}
                      </h1>


                      <div> <p>Below is a list of data categories for the client. You can add to, remove from, and search each category.
                      Each item has a description below it. To start organizing your project, select a category. </p>  </div>

                    {

                      items.map((val,index)=>{
                            return (
                              <div key={index}>
                              <hr/>
                                <a href={window.location.pathname + val.link } >
                                 <div className={ selectedItemViaArrowKeypress === index ? classes.clientItemSelected : classes.clientItem}>{val.title}</div>

                                </a>
                                <div className={classes.description}> - {val.description}</div>
                              </div>
                            )
                        })
                    }

                      <div>
                    </div>          
                </div>
                </Grid>
            </div>
     
            
      </div>

	)
}


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const styles = theme => (dashboardStyle(theme));
export default withStyles(styles)(Dashboard);



