import moment from 'moment-timezone';


let timeDate = "Monday, December 30, 2019 12:00 PM"
var newYork = moment.tz(timeDate, "dddd, MMM DD, YYYY h:mm a", "America/New_York");


var losAngeles = newYork.clone().tz("America/Los_Angeles");
var london     = newYork.clone().tz("Europe/London");

console.log(newYork.format("LLLL"));    // Sunday, June 1, 2014 12:00 PM
console.log(losAngeles.format("LLLL")); // Sunday, June 1, 2014 9:00 AM
console.log(london.format("LLLL"));     // Sunday, June 1, 2014 5:00 PM





// if localDate or localTimeZone change, THEN ....
// capture new localDate and localTImeZOne
// THEN create new dateOne and dateTwo objects




  // function onChangeTimeZoneLocal(timezone){
  //    console.log(timezone)
  //    setTimeZoneLocal(timezone)

  //    let timeDate = moment(eventDate).format("LLLL")
  //    let localDate = moment.tz(timeDate, "dddd, MMM DD, YYYY h:mm a", timeZoneLocal.value);
  //    setEventDate(localDate)

  //    let dateOne = localDate.clone().tz(timeZoneOne.value);
  //    let dateTwo = localDate.clone().tz(timeZoneTwo.value);
  //    console.log(localDate + " localTwo")
     
  //    setDateOne(dateOne)
  //    setDateTwo(dateTwo)

  // }


  // function localDateHandler(momentObj){
     
  //    let timeDate = moment(momentObj).format("LLLL")
  //    let localDate = moment.tz(timeDate, "dddd, MMM DD, YYYY h:mm a", timeZoneLocal.value);
  //    setEventDate(localDate)

  //    let dateOne = localDate.clone().tz(timeZoneOne.value);
  //    let dateTwo = localDate.clone().tz(timeZoneTwo.value);
  //    console.log(localDate + " localTwo")
     
  //    setDateOne(dateOne)
  //    setDateTwo(dateTwo)

  // }