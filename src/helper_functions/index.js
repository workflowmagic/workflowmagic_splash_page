
import moment from 'moment';

export function trimString(str){
  return  str.trim()
}


export function instantSearchFilter(s,arr){

  const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
  const re = RegExp(p,"i");
  
  let matched = arr.filter(v => v.name.match(re));

  let result = matched.map(function(val,index,arr){
            return val
  });

  console.log(result)
  
  return result


}

export function instantSearchWorkflowFilter(s,arr){

  const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
  const re = RegExp(p,"i");
  
  let matched = arr.filter(v => v.title.match(re));

  let result = matched.map(function(val,index,arr){
            return val
  });

  console.log(result)
  
  return result


}

export function instantSearchContactFilter(s,arr){

  const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
  const re = RegExp(p,"i");
  
  let matched = arr.filter(v => v.title.match(re));

  let result = matched.map(function(val,index,arr){
            return val
  });

  console.log(result)
  
  return result


}




export function restUrlToObject(pathname){
  /* function only takes the pathname of url */
  let endpoint = pathname.substr(1);
  let array = endpoint.split("/"); 
  let obj = {};
  
  for(let i = 0; i < array.length; i+=1){

  	if( i === 0 || i % 2 === 0){
  		obj[array[i]] = undefined;
  	}else{
  		obj[array[i-1]] = array[i]
  	}
  }
 return obj
}



export function createRepeatWeekDayDates(startDate, endDate) { // returns an array

    var start = moment(startDate),
    end = moment(endDate),
    day = start.day();;

    var result = [];
    var current = start.clone();
    result.push(start)

    while (current.day(7 + day).isBefore(end)) {
        result.push(current.clone());
    }

    let final = result.map(m => new Date(m));

    return final
}


export function createRepeatDatesDaily(startDate, endDate) { // returns an array
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');
     dates.push(currDate.clone().toDate())

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        console.log(currDate.toDate());
        dates.push(currDate.clone().toDate());
    }
console.log(dates)
    return dates;

}



export default restUrlToObject


