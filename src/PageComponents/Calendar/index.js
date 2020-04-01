import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import calendarStyles from 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment-timezone';
import style from "../../PageComponents/Calendar/style";
import restUrlToObject, { createRepeatWeekDayDates, createRepeatDatesDaily } from '../.././helper_functions';
import db, { getAllClients, getClientCalendarEvents, createCalendarEvent, getAllCalendarEvents, createCalendarEventGroupID, deleteCalendarEvent, deleteGroupedCalendarEvents } from "../../services/indexDB";
import REST from "../../services/rest";
import CreateEventModal from "../../PageComponents/Calendar/CreateEventModal";
import EditEventModal from "../../PageComponents/Calendar/EditEventModal";
import DateTextEditor from "../../PageComponents/Calendar/DateTextEditor";
import SearchClients from "../../PageComponents/Calendar/ClientSearch";
import "../../index.css";

// https://www.npmjs.com/package/react-timezone-select




const localizer = BigCalendar.momentLocalizer(moment);
const styles = theme => (style(theme));


const Calendar = (props) => {
    const { classes } = props;

    // @Clients and selected client
    const [clientName,setClientName] = useState(undefined)
    const [clientList, setClientList] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});


    // @Get and set calendar events
    const [calendarEventsList, setCalendarEventsList] = useState([]);
    const [calendarEventsQueryTrigger, setCalendarEventsQueryTrigger] = useState("");

    // @ Create events 
    const [modalOpenCreateEvent, setModalOpenCreateEvent] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const initialStartDateState = new Date(moment());

    //_____Dates & TimeZone
    const [eventDate, setEventDate] = useState(initialStartDateState);
    const [dateOne, setDateOne] = useState(initialStartDateState);
    const [dateTwo, setDateTwo] = useState(initialStartDateState);


    const [repeatEventUntil, setRepeatEventUntil] = useState(initialStartDateState);


    //@Edit events
    const [selectedCalendarEvent, setSelectedCalendarEvent] = useState({});
    const [modalOpenEditEvent, setModalOpenEditEvent] = useState(false);


    //@ Timezones
    const [timeZoneLocal, setTimeZoneLocal] = useState({ value: "America/Dawson", label: "(GMT-08:00) Pacific Time (US and Canada); Tijuana" });
    const [timeZoneOne, setTimeZoneOne] = useState({ label: "(GMT+01:00) Brussels, Copenhagen, Madrid", value: "Europe/Brussels" });
    const [timeZoneTwo, setTimeZoneTwo] = useState({ label: "(GMT+01:00) Brussels, Copenhagen, Madrid", value: "Europe/Brussels" });


    //@ date repeat value
    const [repeatDaily, setRepeatDaily] = useState(false)
    const [repeatWeekly, setRepeatWeekly] = useState(false)
    const [repeatMonthly, setRepeatMonthly] = useState(false)


    //@ Model IS open
    const [modalOpenState, setModalOpenState] = useState(false)

    useEffect(() => { // @Get all clients
        getAllClients().then((clients) => {
            setClientList(clients)
        })

    }, []);


    useEffect(() => { // @Get all calendar events

        const id = REST.getClientID();


        if (id) {
            getClientCalendarEvents(id).then((result) => {
                setCalendarEventsList(result)
            });

        } else {

            getAllCalendarEvents().then((result) => {
                setCalendarEventsList(result)
            });

        }


    }, [calendarEventsQueryTrigger])

    useEffect(()=>{
        const name = REST.getClientName();
        if(name){
            setClientName(name)
        }else{
            setClientName("Full Calendar")
        }
    },[calendarEventsQueryTrigger])




    //_____________________BEGIN State listeners for time zone changes

    useEffect(() => {

        let localDateConvertion = moment(eventDate).format("LLLL");
        console.log(localDateConvertion)
        let localDate = moment.tz(localDateConvertion, "dddd, MMM DD, YYYY h:mm a", timeZoneLocal.value);
        let dateOneVal = localDate.clone().tz(timeZoneOne.value);
        let dateTwoVal = localDate.clone().tz(timeZoneTwo.value);
        setDateOne(dateOneVal)
        setDateTwo(dateTwoVal)
    }, [timeZoneLocal,eventDate])

    useEffect(() => {
        let localDateConvertion = moment(dateOne).format("LLLL");
        console.log(localDateConvertion)
        let localDate = moment.tz(localDateConvertion, "dddd, MMM DD, YYYY h:mm a", timeZoneOne.value);
        let eventDateVal = localDate.clone().tz(timeZoneLocal.value);
        let dateTwoVal = localDate.clone().tz(timeZoneTwo.value);
        setEventDate(eventDateVal)
        setDateTwo(dateTwoVal)
    }, [timeZoneOne])


    useEffect(() => {
        let localDateConvertion = moment(dateTwo).format("LLLL");
        console.log(localDateConvertion)
        let localDate = moment.tz(localDateConvertion, "dddd, MMM DD, YYYY h:mm a", timeZoneTwo.value);
        let eventDateVal = localDate.clone().tz(timeZoneLocal.value);
        let dateOneVal = localDate.clone().tz(timeZoneOne.value);
        setEventDate(eventDateVal)
        setDateOne(dateOneVal)
    }, [timeZoneTwo])

    //_____________________END State listeners for time zone changes

    useLayoutEffect(() => {
        console.log(eventDescription)
    })



    function instantSearchHandler() {
        console.log("search handler")
    }


    //__________________________________BEGIN Modal open/close and submission

    function openCreateEventModal(event) {

        const clientID = REST.getClientID();
        const clientName = REST.getClientName();
        let clientData = {
            name: clientName,
            id: clientID
        }


        if (clientID === undefined) {
            clientData = ""
            setSelectedClient(clientData);
            setEventDate(event.start);
            setRepeatEventUntil(event.start);
            setModalOpenCreateEvent(true);
        } else {

            setSelectedClient(clientData);
            setEventDate(event.start);
            setRepeatEventUntil(event.start);
            setModalOpenCreateEvent(true);
        }

        // console.log("opened before conditional")

        // if(event){

        //   setSelectedClient(client);
        //   setEventDate(event.start);
        //   setRepeatEventUntil(event.start);
        //   setModalOpenCreateEvent(true);

        // }else{

        //   console.log("yessss");
        //   let event = new Date(moment());
        //   setSelectedClient(client);
        //   setEventDate(event);
        //   setRepeatEventUntil(event);
        //   setModalOpenCreateEvent(true);

        // }




    }



    function setEventTitleHandler(e) {
        setEventTitle(e.target.value);
    }


    function closeCreateEventModal() {
        setModalOpenCreateEvent(false)
    }


    function closeEditEventModal() {
        setModalOpenEditEvent(false)
    }




    function submitDate(event) {


        if (!eventTitle) {
            alert("please add an event title")
            event.preventDefault()
            return
        }

        event.preventDefault();
        console.log(eventDate);
        console.log(selectedClient)

        let repeat = moment(eventDate).format("LLLL") === moment(repeatEventUntil).format("LLLL") ? false : true

        let calendarEvent = {
            start: new Date(eventDate),
            end: new Date(eventDate),
            title: eventTitle,
            description: eventDescription,
            clientID: selectedClient.id,
            clientName: selectedClient.name,
            userID: undefined,
            groupID: undefined
        }


        if (repeatDaily) {

            // create_calendar_group entry in indexDB
            createCalendarEventGroupID(calendarEvent.title, calendarEvent.clientName, calendarEvent.clientID).then((groupID) => {

                // let listOfEvents = createRepeatWeekDayDates(eventDate, repeatEventUntil);

                let listOfEvents = createRepeatDatesDaily(eventDate, repeatEventUntil);
                console.log(listOfEvents)

                for (let i = 0; i < listOfEvents.length; i += 1) {


                    let calendarEvent = {
                        start: listOfEvents[i],
                        end: listOfEvents[i],
                        title: eventTitle,
                        description: eventDescription,
                        clientID: selectedClient.id,
                        clientName: selectedClient.name,
                        userID: undefined,
                        groupID: groupID // set group ID here.
                    }


                    createCalendarEvent(calendarEvent);
                    setCalendarEventsQueryTrigger(Math.random()) // Math.random is used to retrigger useEffect and get events - Nothing else.

                }

                setEventTitle("");
                setEventDescription("");


            });



        } else if (repeatWeekly) {

            // create_calendar_group entry in indexDB

            createCalendarEventGroupID(calendarEvent.title, calendarEvent.clientName, calendarEvent.clientID).then((groupID) => {
                // let listOfEvents = createRepeatWeekDayDates(eventDate, repeatEventUntil);
                let listOfEvents = createRepeatWeekDayDates(eventDate, repeatEventUntil);

                for (let i = 0; i < listOfEvents.length; i += 1) {


                    let calendarEvent = {
                        start: listOfEvents[i],
                        end: listOfEvents[i],
                        title: eventTitle,
                        description: eventDescription,
                        clientID: selectedClient.id,
                        clientName: selectedClient.name,
                        userID: undefined,
                        groupID: groupID // set group ID here.
                    }


                    createCalendarEvent(calendarEvent);
                    setCalendarEventsQueryTrigger(Math.random()) // Math.random is used to retrigger useEffect and get events - Nothing else.

                }

                setEventTitle("");
                setEventDescription("");


            });


        } else {


            createCalendarEvent(calendarEvent).then((id) => {
                console.log(id);
                setCalendarEventsQueryTrigger(Math.random() + id) // Math.random is used to retrigger useEffect and get events - Nothing else.
                setEventTitle("");
                setEventDescription("");

            })


        }


        closeCreateEventModal();
    }

    function clearDateRepeat() {
        setRepeatDaily(false)
        setRepeatWeekly(false)
        setRepeatMonthly(false)
    }



    function selectEventHandler(eventObj) {
        setSelectedCalendarEvent(eventObj)
        console.log(eventObj)
        setModalOpenEditEvent(true)

    }



    function deleteEvent(event) {
        event.preventDefault();

        deleteCalendarEvent(selectedCalendarEvent.id).then((bool) => {
            setSelectedCalendarEvent({});
            setCalendarEventsQueryTrigger(Math.random()); // Math.random is just here to trigger useEffect. Nothing else

        });

        closeEditEventModal();

    }

    // @ Determine if event is part of a group
    function deleteEventAndGroup(event) {

        // @ if group id is undefined <----
        // only delete individual event

        event.preventDefault()

        if (selectedCalendarEvent.group_id) {

            deleteGroupedCalendarEvents(selectedCalendarEvent.group_id).then((x) => {

                setSelectedCalendarEvent({});
                setCalendarEventsQueryTrigger(Math.random()); // Math.random is just here to trigger useEffect. Nothing else

            });

            closeEditEventModal()


        } else {

            deleteEvent(event)
            closeEditEventModal()
        }

    }


    function onChangeTimeZoneLocal(timezone) {
        setTimeZoneLocal(timezone)



    }


    function localDateHandler(momentObj) {
        let localDateConvertion = moment(momentObj).format("LLLL");
        let localDate = moment.tz(localDateConvertion, "dddd, MMM DD, YYYY h:mm a", timeZoneLocal.value);
        let dateOneVal = localDate.clone().tz(timeZoneOne.value);
        let dateTwoVal = localDate.clone().tz(timeZoneTwo.value);
        setEventDate(localDate)
        console.log(eventDate)
        setDateOne(dateOneVal)
        setDateTwo(dateTwoVal)

        let startDateIsAheadOfEndDate = moment(localDate).isAfter(repeatEventUntil);
        // 

        if (startDateIsAheadOfEndDate) {
            setRepeatEventUntil(localDate)
        }


    }


    function onChangeTimeZoneOne(timezone) {
        setTimeZoneOne(timezone);

    }


    function dateOneHandler(momentObj) {
        let mainConvertion = moment(momentObj).format("LLLL");
        let main = moment.tz(mainConvertion, "dddd, MMM DD, YYYY h:mm a", timeZoneOne.value);
        let eventDate = main.clone().tz(timeZoneLocal.value);
        let dateTwo = main.clone().tz(timeZoneTwo.value);
        setDateOne(main);
        setEventDate(eventDate);
        setDateTwo(dateTwo);
    }


    function onChangeTimeZoneTwo(timezone) {
        setTimeZoneTwo(timezone)
    }



    function dateTwoHandler(momentObj) {
        let mainConvertion = moment(momentObj).format("LLLL");
        let main = moment.tz(mainConvertion, "dddd, MMM DD, YYYY h:mm a", timeZoneTwo.value);
        let eventDate = main.clone().tz(timeZoneLocal.value);
        let dateOne = main.clone().tz(timeZoneOne.value);
        setDateTwo(main)
        setEventDate(eventDate)
        setDateOne(dateOne)


    }


    function setEndDate(eventDateEnd) {
        let endDateIsBeforeStartDate = moment(eventDateEnd).isBefore(eventDate);
        // 

        if (endDateIsBeforeStartDate) {
            alert("end date can not be before start date")
        } else {
            setRepeatEventUntil(eventDateEnd)
        }
    }


    // function redirectToWorkflows(val){
    //    window.location.href = `/client/${val.id}/client-name/${val.name}/workflows`

    // }

    function onBodyDescriptionChange(val) {

        setEventDescription(val);

    }




    return (

        <div className={classes.root}>
        <div className={classes.calendarContainer}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
                   <div className = {classes.clientTitleContainer}>
                  <h1 className="logoFontContainerDashboard">
                          Workflow Magic
                      </h1>
                        <h1 className="clientFontContainer">
                            {decodeURI(clientName)}
                      </h1>
                       </div>
            <p className = {classes.instructions}>To add an event to the calendar, simply select a date.</p>
              </Grid>
                <Grid item xs={12}>

               {/* <Grid item xs={12} sm={12} md={6} xl={6}> */}


                <h2 className = {classes.description}>Calendar</h2>
                  <BigCalendar
                        selectable
                        onSelectEvent = {(a,b)=>selectEventHandler(a,b)}
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={calendarEventsList}
                        style={{ height: "50vh",position:"relative"}}
                        onSelectSlot={(data)=>{ openCreateEventModal(data)}}

                  />


                </Grid>
              <Grid item xs={12} sm={12} md={6} xl={6}>


            {/* <h2 className = {classes.description}>Client List</h2> */}

          <div className = {classes.selectorParent}>
          
      

         </div>
              <CreateEventModal 
                open={modalOpenCreateEvent} 
                onClose={closeCreateEventModal} 

                eventTitle={eventTitle}
                setEventTitle = {setEventTitleHandler}

                //_____________________________________________________________
                eventDate={eventDate} 
                localDateHandler = {localDateHandler}
                timeZoneLocal = {timeZoneLocal}
                onChangeTimeZoneLocal = {onChangeTimeZoneLocal}

                //______________________________________________________________
                dateOne = {dateOne}
                dateOneHandler = {dateOneHandler}
                timeZoneOne = {timeZoneOne}
                onChangeTimeZoneOne= {onChangeTimeZoneOne}


                //______________________________________________________________
                dateTwo = {dateTwo}
                dateTwoHandler = {dateTwoHandler}
                onChangeTimeZoneTwo= {onChangeTimeZoneTwo}
                timeZoneTwo = {timeZoneTwo}


                //______________________________________________________________
                setRepeatEventUntil = {(e)=>setEndDate(e)}
                repeatEventUntil={repeatEventUntil}
                clearDateRepeat={clearDateRepeat}
                repeatDaily = {repeatDaily}
                setRepeatDaily = {(e)=> setRepeatDaily(e)}
                repeatWeekly = {repeatWeekly}
                setRepeatWeekly ={(e)=> setRepeatWeekly(e)}
                repeatMonthly = {repeatMonthly}
                setRepeatMonthly ={(e)=> setRepeatMonthly(e)}

                submitDate = {submitDate}


                //______________________________________________________________
                onBodyDescriptionChange = {onBodyDescriptionChange}
                bodyDescriptionValue = {eventDescription}
                //______________________________________________________________
                selectedClient = {selectedClient}

              />



              <EditEventModal 
                open={modalOpenEditEvent} 
                onClose={closeEditEventModal} 
                deleteEvent = {deleteEvent}
                eventData = {selectedCalendarEvent}
                deleteEventAndGroup = {deleteEventAndGroup}
              />



            </Grid>
          </Grid>
        </div>
      </div>
    );
}


Calendar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);






/*

 set all inputs.
 on each inpout run a useEffect to calculate conversions

*/







/*______________________________


 openCreateEventModal

 Listen for eventDate change in a useEffect.
 in the useEffect set dateOne and dateTwo








@itinerary

TIMEZONE conversion:  https://www.npmjs.com/package/select-timezone-material-ui

Set workflow placeholder text to be larger:      font-size: 3.3vmin;

CREATE repeatable event entries based on day & month

@IMPORTANT TODO:   when deleting clients, make sure to destroy all workflows and Calendar events!





SHOW ONLY: show only feature for client events


INSTANT SEARCH

SAVE/LOAD


EMAIL notification API

BEGIN new app for invoicing

_______________________________________





Take convas screen shot to convert to pdf
https://blog.risingstack.com/pdf-from-html-node-js-puppeteer/

https://stackblitz.com/edit/react-4798tj

https://medium.com/@shivekkhurana/how-to-create-pdfs-from-react-components-client-side-solution-7f506d9dfa6d

https://html2canvas.hertzen.com/

*/