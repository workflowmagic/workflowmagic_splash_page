
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import parse from 'html-react-parser';
import Modal from '@material-ui/core/Modal';
import style from "../../PageComponents/Calendar/style";




function EditEventModal(props){

   const { classes, open,onClose, deleteEvent, deleteEventAndGroup,eventData } = props;

   eventData.client_name  = (eventData.client_name === undefined) ?  "None" : eventData.client_name

   return (

        <div  className = {classes.root}>

            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={onClose}
            >

              <div className={classes.paperModal}>
                   <h2> { 
                     parse(`Client: ${eventData.client_name}` || " ")
                   }
              </h2>
              <h2> { 
                     parse(eventData.title || " ")
                   }
              </h2>

               <p>
                   { 
                     parse(eventData.description|| " ")
                   }
               </p>
              
         
               <h4>Delete Event</h4>

              <form onSubmit={deleteEvent}>
                <Button type="submit">KILL</Button>
              </form>


              <h4>Delete Event and its Group</h4>
              <form onSubmit={deleteEventAndGroup}>                
                  <Button type="submit">KILL ALL</Button>
              </form>
              </div>
            </Modal>

        </div>
    );
}



const styles = theme => (style(theme));


EditEventModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditEventModal);
