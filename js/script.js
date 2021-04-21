// const button = document.querySelector('#ageBtn');
// const displayValue = button.nextElementSibling.firstChild;
// console.log(displayValue);

// const input2 = document.querySelector('.input2');
// const input1 = document.querySelector('.input1');


// button.addEventListener('click', ()=>{
// //	VALUES OF THE 1ST INPUT
// 	const year1  = Math.abs(input1.value.slice(0,4));
// 	const month1 = Math.abs(input1.value.slice(5,7));
// 	const day1   = Math.abs(input1.value.slice(8,10));

// //	VALUES OF THE 2ND INPUT
// 	const year2  = Math.abs(input2.value.slice(0,4));
// 	const month2 = Math.abs(input2.value.slice(5,7));
// 	const day2   = Math.abs(input2.value.slice(8,10));
	
// //	FIDNING THE DIFFERENCE
// 	const year = year2 - year1;
// 	const month = month2 - month1;
// 	const day = day2 - day1;
	
	
// //	displayValue.textContent= 
// 	alert( year + ' years, ' + month + ' months, '  + 'and ' + day +  ' days');
// });

let form = document.querySelector('#calcYear');
let number = document.querySelector('#number');
let date = new Date();

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const year = date.getFullYear() - number.value;
    document.querySelector('#display').innerText = `Your birth year is ${year}`;
});


//date = new Date();
 form = document.querySelector('#calcAge');
 let fDate = document.querySelector('#initDate');
 let sDate = document.querySelector('#finalDate');


 var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let disp = document.querySelector('#display2');
    let fd = fDate.value;
    let sd = sDate.value;
  
    if(fd == undefined || fd == null || fd == '' || sd == undefined || sd == null || sd == ''){
        disp.innerText = "Please enter a valid date.";
        disp.style.color = 'red';
        return;
    }
    
    let date1 = new Date(fd);
    let date2 = new Date(sd);

    if(dates.compare(date1,date2) == 1){
        disp.innerText = "Please your date of birth should be lesser than the future date.";
        disp.style.color = 'red';
        return;
    }

    let diff_in_millisec = Math.abs(date1-date2);
    const MILLI_SEC_IN_YEAR = 31536000000;
    const ONE_MILLI_TO_MONTH = 0.00000000038;
    const DAY_MILLI_TO_ONE = 1000 * 60 * 60 * 24;
    let year = Math.floor(diff_in_millisec/MILLI_SEC_IN_YEAR);
    let milli_sec_to_calc_month = diff_in_millisec % MILLI_SEC_IN_YEAR;
    let month = Math.floor( milli_sec_to_calc_month * ONE_MILLI_TO_MONTH);
    let milli_sec_to_calc_day = (milli_sec_to_calc_month * ONE_MILLI_TO_MONTH) % month;
   
    disp.removeAttribute('style');
    disp.innerText = `You are ${year} year(s) ${month} month(s) old.`;
});