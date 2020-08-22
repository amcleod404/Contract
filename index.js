
// UI Elements
const day = document.getElementById("day");
const time = document.getElementById("time");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const form = document.getElementById('form');
const info = document.getElementById('time-info');
// Global Variables
var count = 0; // counts number of seconds elapsed
var num = Math.round(Math.random() * 1642); // a random number generator to choose quote of the day
// Clock in/out tracking vars
var ianStart;
var ianFinish;
var ianTotal;
var nikkoStart;
var nikkoFinish;
var nikkoTotal;
var andrewStart;
var andrewFinish;
var andrewTotal;
var ryanStart;
var ryanFinish;
var ryanTotal;

// *****************************************************************************************


// Functions to display current time
displayQuote();

function display_c() {
  var refresh = 1000;
  mytime = setTimeout("display_ct()", refresh);
  count++;
  if (count == 80000) {
    if (num == 1642) {
      num = Math.round(Math.random() * 1642);
    } else {
      num++;
    }

    count = 0;
    displayQuote();
  }
}

function display_ct() {
  var startDate = new Date();
  day.innerHTML =
    ("0" + (startDate.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + startDate.getDate()).slice(-2) +
    "/" +
    startDate.getFullYear();

  time.innerHTML =
    startDate.getHours() +
    ":" +
    ("0" + startDate.getMinutes()).slice(-2) +
    ":" +
    ("0" + startDate.getSeconds()).slice(-2);
  display_c();
}

// *****************************************************************************************

// Function to display daily quote

function displayQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var words = data[num].text;
      words = words.substring(0, words.length - 1);
      theAuthor = data[num].author;
      if (theAuthor == null) {
        theAuthor = "Anonymous";
      }
      quote.innerHTML = words;
      author.innerHTML = "-" + theAuthor;
    });
}

// Clock-In functionality

const clockIn = (id) => {
  if (id.value === "") {
    alert('Enter an ID to Clock In 🤡');
  }

  var login = hashCode(id.value);
  switch(login) {
    case 590:
      if (localStorage.getItem('nikkoTime') !== null) {
        alert('You are already clocked in!');
        break;
      }
      nikkoStart = new Date();
      storeStartTime(nikkoStart, 1);
      alert('You have successfully clocked in');
      break;

    case 638:
      if (localStorage.getItem('ryanTime') !== null) {
        alert('You are already clocked in!');
        break;
      }
      ryanStart = new Date();
      storeStartTime(ryanStart, 2);
      alert('You have successfully clocked in');
      break;

    case 1238:
      if (localStorage.getItem('ianTime') !== null) {
        alert('You are already clocked in!');
        break;
      }
      ianStart = new Date();
      storeStartTime(ianStart, 3);
      alert('You have successfully clocked in');
      break;

    case 1033:
      if (localStorage.getItem('andrewTime') !== null) {
        alert('You are already clocked in!');
        break;
      }
      andrewStart = new Date();
      storeStartTime(andrewStart, 4);
      alert('You have successfully clocked in');
      break;

  }
  
};

const storeStartTime = (start, id) => {
  let nikkoTime;
  let ryanTime;
  let ianTime;
  let andrewTime;

  if (id === 1) {
      nikkoTime = [];
      nikkoTime.push(start.toString());
      localStorage.setItem('nikkoTime', JSON.stringify(nikkoTime));
    
  }

  if (id === 2) {
      ryanTime = [];
      ryanTime.push(start.toString());
      localStorage.setItem('ryanTime', JSON.stringify(ryanTime));
    
  }
  
  if (id === 3) {
      ianTime = [];
      ianTime.push(start.toString());
      localStorage.setItem('ianTime', JSON.stringify(ianTime));
    
  }

  if (id === 4) {
      andrewTime = [];
      andrewTime.push(start.toString());
      localStorage.setItem('andrewTime', JSON.stringify(andrewTime));
    
  }

}

// *********************************************************************************************

// Clock-Out Functionality

const clockOut = (id) => {
  var login = hashCode(id.value);
  switch(login) {
    case 590:
      if (localStorage.getItem('nikkoTime') === null) {
        alert('You have not clocked in! You must clock in before you can clock out');
        break;
      }
      nikkoFinish = new Date();
      storeFinishTime(nikkoFinish, 1);
      getTime(id, 1);
      
      break;

    case 638:
      if (localStorage.getItem('ryanTime') === null) {
        alert('You have not clocked in! You must clock in before you can clock out');
        break;
      }
      ryanFinish = new Date();
      storeFinishTime(ryanFinish, 2);
      getTime(id, 2);
      break;

    case 1238:
      if (localStorage.getItem('ianTime') === null) {
        alert('You have not clocked in! You must clock in before you can clock out');
        break;
      }
      ianFinish = new Date();
      storeFinishTime(ianFinish, 3);
      getTime(id, 3);
      break;

    case 1033:
      if (localStorage.getItem('andrewTime') === null) {
        alert('You have not clocked in! You must clock in before you can clock out');
        break;
      }
      andrewFinish = new Date();
      storeFinishTime(andrewFinish, 4);
      getTime(id, 4);
      break;
  }
};

const storeFinishTime = (finish, id) => {

  let nikkoTime;
  let ryanTime;
  let ianTime;
  let andrewTime;

  if (id === 1) {
    
    nikkoTime = JSON.parse(localStorage.getItem('nikkoTime'));
    nikkoTime.push(finish.toString());
    localStorage.setItem('nikkoTime', JSON.stringify(nikkoTime));
    
  }

  if (id === 2) {

    ryanTime = JSON.parse(localStorage.getItem('ryanTime'));
    ryanTime.push(finish.toString());
    localStorage.setItem('ryanTime', JSON.stringify(ryanTime));
    
  }
  
  if (id === 3) {

    ianTime = JSON.parse(localStorage.getItem('ianTime'));
    ianTime.push(finish.toString());
    localStorage.setItem('ianTime', JSON.stringify(ianTime));
    
  }

  if (id === 4) {

    andrewTime = JSON.parse(localStorage.getItem('andrewTime'));
    andrewTime.push(finish.toString());
    localStorage.setItem('andrewTime', JSON.stringify(andrewTime));
    
  }
  
}

// **************************************************************************************

// Logic for calculating total time

const getTime = (name, id) => {

  storeTotalTime(id);

  if (id === 1) {
    info.innerHTML = `
    <h3>Total Time: </h3>
    <p><span id ='time'> Nikko</span> - ${localStorage.getItem('nikkoTotal')}</p>
    <p>Ryan - ${localStorage.getItem('ryanTotal')}</p>
    <p>Ian - ${localStorage.getItem('ianTotal')}</p>
    <p>Andrew - ${localStorage.getItem('andrewTotal')}</p>
    <button type = 'button' class = 'btn btn-primary' id = 'continue' onclick = 'reset()'>Continue</button>`
  }
  
  if (id === 2) {
    info.innerHTML = `
    <h3>Total Time: </h3>
    <p> Nikko - ${localStorage.getItem('nikkoTotal')}</p>
    <p><span id ='time'>Ryan</span> - ${localStorage.getItem('ryanTotal')}</p>
    <p>Ian - ${localStorage.getItem('ianTotal')}</p>
    <p>Andrew - ${localStorage.getItem('andrewTotal')}</p>
    <button type = 'button' class = 'btn btn-primary' id = 'continue' onclick = 'reset()'>Continue</button>`
  }

  if (id === 3) {
    info.innerHTML = `
    <h3>Total Time: </h3>
    <p> Nikko - ${localStorage.getItem('nikkoTotal')}</p>
    <p>Ryan - ${localStorage.getItem('ryanTotal')}</p>
    <p><span id ='time'>Ian</span> - ${localStorage.getItem('ianTotal')}</p>
    <p>Andrew - ${localStorage.getItem('andrewTotal')}</p>
    <button type = 'button' class = 'btn btn-primary' id = 'continue' onclick = 'reset()'>Continue</button>`
    
  }

  if (id === 4) {
    info.innerHTML = `
    <h3>Total Time: </h3>
    <p> Nikko - ${localStorage.getItem('nikkoTotal')}</p>
    <p>Ryan - ${localStorage.getItem('ryanTotal')}</p>
    <p>Ian - ${localStorage.getItem('ianTotal')}</p>
    <p><span id ='time'>Andrew</span> - ${localStorage.getItem('andrewTotal')}</p>
    <button type = 'button' class = 'btn btn-primary' id = 'continue' onclick = 'reset()'>Continue</button>`
  }
    
    form.style.display = 'none';
    info.style.display = 'block';

}

const storeTotalTime = (id) => {
  if (localStorage.getItem('nikkoTotal') === null) {
    localStorage.setItem('nikkoTotal', "Hours: 0 , Minutes: 0 , Seconds: 0");
  }
  if (localStorage.getItem('ryanTotal') === null) {
    localStorage.setItem('ryanTotal', "Hours: 0 , Minutes: 0 , Seconds: 0");
  }
  if (localStorage.getItem('ianTotal') === null) {
    localStorage.setItem('ianTotal', "Hours: 0 , Minutes: 0 , Seconds: 0");
  }
  if (localStorage.getItem('andrewTotal') === null) {
    localStorage.setItem('andrewTotal', "Hours: 0 , Minutes: 0 , Seconds: 0");
  }

  if (id === 1) {

    var previousTotal = localStorage.getItem('nikkoTotal');
    var previousHours = parseInt(previousTotal.substring(7,8)) * 3600;
    var previousMinutes = parseInt(previousTotal.substring(20,21)) * 60;
    var previousSeconds = parseInt(previousTotal.substring(33));

    var time = localStorage.getItem('nikkoTime');
    time = time.substring(1, time.length - 1);
    time = time.split(',');
    var totalTime = Date.parse(time[1]) - Date.parse(time[0]);
    totalTime = totalTime / 1000;
    totalTime += (previousHours + previousMinutes + previousSeconds);
    var hours = Math.floor(totalTime / 3600);
    var minutes = Math.floor((totalTime % 3600) / 60);
    var seconds = (totalTime % 3600) % 60;
    totalTime = "Hours: " + hours + " , Minutes: " + minutes + " , Seconds: " + seconds;
    localStorage.setItem('nikkoTotal', totalTime);
    localStorage.removeItem('nikkoTime');

  }

  if (id === 2) {

    var previousTotal = localStorage.getItem('ryanTotal');
    var previousHours = parseInt(previousTotal.substring(7,8)) * 3600;
    var previousMinutes = parseInt(previousTotal.substring(20,21)) * 60;
    var previousSeconds = parseInt(previousTotal.substring(33));

    var time = localStorage.getItem('ryanTime');
    time = time.substring(1, time.length - 1);
    time = time.split(',');
    var totalTime = Date.parse(time[1]) - Date.parse(time[0]);
    totalTime = totalTime / 1000;
    totalTime += (previousHours + previousMinutes + previousSeconds);
    var hours = Math.floor(totalTime / 3600);
    var minutes = Math.floor((totalTime % 3600) / 60);
    var seconds = (totalTime % 3600) % 60;
    totalTime = "Hours: " + hours + " , Minutes: " + minutes + " , Seconds: " + seconds;
    localStorage.setItem('ryanTotal', totalTime);
    localStorage.removeItem('ryanTime');
    
  }
  
  if (id === 3) {

    var previousTotal = localStorage.getItem('ianTotal');
    var previousHours = parseInt(previousTotal.substring(7,8)) * 3600;
    var previousMinutes = parseInt(previousTotal.substring(20,21)) * 60;
    var previousSeconds = parseInt(previousTotal.substring(33));

    var time = localStorage.getItem('ianTime');
    time = time.substring(1, time.length - 1);
    time = time.split(',');
    var totalTime = Date.parse(time[1]) - Date.parse(time[0]);
    totalTime = totalTime / 1000;
    totalTime += (previousHours + previousMinutes + previousSeconds);
    var hours = Math.floor(totalTime / 3600);
    var minutes = Math.floor((totalTime % 3600) / 60);
    var seconds = (totalTime % 3600) % 60;
    totalTime = "Hours: " + hours + " , Minutes: " + minutes + " , Seconds: " + seconds;
    localStorage.setItem('ianTotal', totalTime);
    localStorage.removeItem('ianTime');
  }

  if (id === 4) {

    var previousTotal = localStorage.getItem('andrewTotal');
    var previousHours = parseInt(previousTotal.substring(7,8)) * 3600;
    var previousMinutes = parseInt(previousTotal.substring(20,21)) * 60;
    var previousSeconds = parseInt(previousTotal.substring(33));

    var time = localStorage.getItem('andrewTime');
    time = time.substring(1, time.length - 1);
    time = time.split(',');
    var totalTime = Date.parse(time[1]) - Date.parse(time[0]);
    totalTime = totalTime / 1000;
    totalTime += (previousHours + previousMinutes + previousSeconds);
    var hours = Math.floor(totalTime / 3600);
    var minutes = Math.floor((totalTime % 3600) / 60);
    var seconds = (totalTime % 3600) % 60;
    totalTime = "Hours: " + hours + " , Minutes: " + minutes + " , Seconds: " + seconds;
    localStorage.setItem('andrewTotal', totalTime);
    localStorage.removeItem('andrewTime');
    
  }

}


// ************************************************************************************************************

// Miscellaneous Functions

// Converts the timesheet back to the start page
const reset = () => {
  info.style.display = 'none';
  form.style.display = 'block';
}

// Determines which user is logging in
const hashCode = (name) => {
  var hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return hash;

}
