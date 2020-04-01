import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import parse from 'html-react-parser';
import clientContactsStyle from '../../PageComponents/Contacts/style';



function ContactContent(props){

    const { classes, onClickAction, title, selectedContact } = props;

    console.log(selectedContact)

    /*
     
     title: "CEO"
    additional_information: "<p>ddssdds</p>"
    client_id: 1
    first_name: "William"
    last_name: "Turner"
    email: "will@bigblah.com"
    phone_number: "111-111-1111"
    id: 1


    */
        
  return(   

     <Box className={classes.box}>
       <div className={classes.centerContainer}>
         <div className={classes.outerContainer}>
          <div className={classes.innerContentContainer}>
          <Button className={classes.showContactList} onClick = {onClickAction}>BACK TO CONTACTS LIST</Button>
            <h2 className={classes.contactTextTitle}>{selectedContact.title}</h2>
            <br/>
            <h3>{selectedContact.first_name} {selectedContact.last_name}</h3>
             <p> email: {selectedContact.email}</p>
             <p> phone: {selectedContact.phone_number}</p>
             <hr/>
              <div className={classes.innerTextContent}>
              <h4>Notes</h4>
            
                { 
                  parse(selectedContact.additional_information)
                 }
           
              </div>
           </div>
          </div>
        </div>
     </Box>
    )
}



ContactContent.propTypes = {
    classes: PropTypes.object.isRequired,
};
const styles = (theme) => (clientContactsStyle(theme));
export default withStyles(styles)(ContactContent);
