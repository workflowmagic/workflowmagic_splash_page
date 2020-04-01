
import React, {useState, useEffect, useLayoutEffect}  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
import 'moment-timezone';
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill from 'react-quill'; // ES6
import parse from 'html-react-parser';
import "../../index.css";
import SelectTimezone from 'react-timezone-select';
// import SelectTimezoneMaterialUi from "input-material-ui";
import style from "../../PageComponents/Calendar/style";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



import {
  DatePicker,
  TimePicker,
  DateTimePicker,

} from "material-ui-pickers";





function CreateEventModal(props){

   const { 
    classes, 
    open,
    onClose, 
    eventDate, 
    repeatEventUntil, 
    setRepeatEventUntil, 
    submitDate, 
    setEventTitle, 
    eventTitle,
    timeZoneLocal,
    onChangeTimeZoneLocal,
    timeZoneOne,
    onChangeTimeZoneOne,
    timeZoneTwo,
    onChangeTimeZoneTwo,
    dateOne,
    dateTwo,
    localDateHandler,
    dateOneHandler,
    dateTwoHandler,
    onBodyDescriptionChange,
    bodyDescriptionValue,
    selectedClient,
    repeatDaily,
    setRepeatDaily,
    repeatWeekly,
    setRepeatWeekly,
    repeatMonthly,
    setRepeatMonthly,
    clearDateRepeat,
    clientName,
    clientID



  } = props;

  console.log(dateOne)
 
   return (

        <div  className = {classes.root}>
            
         
            <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={onClose}
            >


  
          <div className={classes.paperModal} style={{overflow: "auto"}}>



          {/*  Place new editor component here */}
        <div className={classes.instructionNote}>
      

          </div>
           <div className={classes.centerContainer}>

            <div className = {classes.clientTitleContainer}>
       
            </div>

          <div className={classes.outerContainer}>
           <div className={classes.innerTextEditorContainer}>     

           <h1 className={classes.clientName}>{decodeURI(selectedClient.name)}</h1>

               <form>
                 <TextField 
                        onChange = {setEventTitle}
                        value={eventTitle}
                        autoComplete = "off"
                        id="standard-dense"
                        label="Title"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        placeholder="EventTitle"
                        type="text"
                        name = "client-list"
                        InputLabelProps={{
                         shrink: true,
                       }}
                  />


                 <br/>

                  <ReactQuill style={{}} placeholder= "Type a description of the event here along with any additional notes" onChange = {onBodyDescriptionChange} value={bodyDescriptionValue} theme="snow" style={{

                    height:"300px",
                    padding:"20px",
                    lineHeight:"0px",
                    fontSize:"100px"
                 
                  }}/> 


                  <p className={classes.startDateText}>Start Date</p>                
                  <DateTimePicker value={eventDate} onChange={localDateHandler}/>

                  
                 <br/>  
                                 <p>End Date</p>
                  {/*  https://material-ui.com/components/menus/   */}

                  <div>
                
                  <DateTimePicker value={repeatEventUntil} onChange={val => {
                       const eventDateVal = new Date(val);  // val is a moment() object from date/time picker
                       setRepeatEventUntil(`${eventDateVal}`);

                  }}/>

      

                  </div>
                 <br/>

                   <h3>Repeat </h3>


                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={repeatDaily}
                        onChange={(e)=> {
                          clearDateRepeat() 
                          setRepeatDaily(!repeatDaily)} 
                        }
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label="Daily"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={repeatWeekly}
                        onChange={(e)=> {
                          clearDateRepeat() 
                          setRepeatWeekly(!repeatWeekly)} 
                        }
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label="Weekly"
                  />

                 {/*} <FormControlLabel
                    control={
                      <Checkbox
                        checked={repeatMonthly}
                        onChange={function(){ alert() }}
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label="Monthly"
                  />
                */}
    

                  <SelectTimezone
                      value = {timeZoneLocal}
                      onChange = {onChangeTimeZoneLocal}
                  />


    

                  <br/>
                
                  <Button className={classes.textButton} type="submit" onClick={submitDate}>Add Event </Button>

               <br/>
               <hr/>
               <br/>
               <p> The Time Zone conversions below are to help you coordinate with clients. </p>
               <p> Changing the values will <u>update</u> the time and day that the event appears on the calendar.</p>

               <div className={classes.dateAndTimeZoneContainer}>
                 <h2 class="dateCreationText">Timezone conversion 1.</h2>
                <DateTimePicker value={dateOne} onChange={dateOneHandler}/>

                 
               <br/>  
               <br/>

                  <SelectTimezone
                      value = {timeZoneOne}
                      onChange = {onChangeTimeZoneOne}

                  />

                  </div>

               <br/>
               <hr/>
               
         
               <div className={classes.dateAndTimeZoneContainer}>
                 <h2 class="dateCreationText">Timezone conversion 2.</h2>
                  <DateTimePicker value={dateTwo} onChange={dateTwoHandler}/>

               <br/>  
               <br/>





                <SelectTimezone
                    value = {timeZoneTwo}
                    onChange = {onChangeTimeZoneTwo}

                />

                </div>

             
                </form>
                
              </div>

              </div>
              </div>

</div>

      
            </Modal>

        </div>
    );
}



const styles = theme => (style(theme));


CreateEventModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateEventModal);


/* Changing any timezone SHOULD update all time values
First timezone should ALWAYS be local time zone.
The other two timezones are optional.


TEST 1.

Get current time Date

run it thhrough localizer functions.

See result.







Create two useEffect state listener functions.

Have one listen for timezone changes
Have one lisen for date/time changes.
Each respective useEffect function will update the variables in the others state listener.



*/

