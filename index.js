const day = document.getElementById("day");
const time = document.getElementById("time");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const form = document.getElementById('form');
const info = document.getElementById('time-info');
var count = 0;
var num = Math.round(Math.random() * 1642);
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

function displayQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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

const clockIn = (id) => {
  if (id.value === "") {
    alert('Enter an ID to Clock In 🤡');
  }

  var login = hashCode(id.value);
  console.log(login);
  switch(login) {
    case 590:
      console.log("beados");
      nikkoStart = new Date();
      storeStartTime(nikkoStart, 1);
      break;

    case 638:
      console.log("ryan");
      ryanStart = new Date();
      storeStartTime(ryanStart, 2);
      break;

    case 1238:
      console.log("ian");
      ianStart = new Date();
      storeStartTime(ianStart, 3);
      break;

    case 1124:
      console.log("andrew");
      andrewStart = new Date();
      storeStartTime(andrewStart, 4);
      break;

  }
  
};

const clockOut = (id) => {
  var login = hashCode(id.value);
  console.log(login);
  switch(login) {
    case 590:
      console.log("beados");
      nikkoFinish = new Date();
      storeFinishTime(nikkoFinish, 1);
      getTime(id, 1);
      
      break;

    case 638:
      console.log("ryan");
      ryanFinish = new Date();
      storeFinishTime(ryanFinish, 2);
      getTime(id, 2);
      break;

    case 1238:
      console.log("ian");
      ianFinish = new Date();
      storeFinishTime(ianFinish, 3);
      getTime(id, 3);
      break;

    case 1124:
      console.log("andrew");
      andrewFinish = new Date();
      storeFinishTime(andrewFinish, 4);
      getTime(id, 4);
      break;
  }
};

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

const reset = () => {
  info.style.display = 'none';
  form.style.display = 'block';
}

const hashCode = (name) => {
  var hash = 0;
  for (let indestartDate = 0; indestartDate < name.length; indestartDate++) {
    hash += name.charCodeAt(indestartDate);
  }
  return hash;

}

const storeStartTime = (start, id) => {
  let nikkoTime;
  let ryanTime;
  let ianTime;
  let andrewTime;

  if (id === 1) {
    if (localStorage.getItem('nikkoTime') === null) {
      nikkoTime = [];
    } else {
      nikkoTime = JSON.parse(localStorage.getItem('nikkoTime'));
    }

    nikkoTime.push(start.toString());
    localStorage.setItem('nikkoTime', JSON.stringify(nikkoTime));
    
  }

  if (id === 2) {
    if (localStorage.getItem('ryanTime') === null) {
      ryanTime = [];
    } else {
      ryanTime = JSON.parse(localStorage.getItem('ryanTime'));
    }

    ryanTime.push(start.toString());
    localStorage.setItem('ryanTime', JSON.stringify(ryanTime));
    
  }
  
  if (id === 3) {
    if (localStorage.getItem('ianTime') === null) {
      ianTime = [];
    } else {
      ianTime = JSON.parse(localStorage.getItem('ianTime'));
    }

    ianTime.push(start.toString());
    localStorage.setItem('ianTime', JSON.stringify(ianTime));
    
  }

  if (id === 4) {
    if (localStorage.getItem('andrewTime') === null) {
      andrewTime = [];
    } else {
      andrewTime = JSON.parse(localStorage.getItem('andrewTime'));
    }

    andrewTime.push(start.toString());
    localStorage.setItem('andrewTime', JSON.stringify(andrewTime));
    
  }
  
  

  

  console.log(localStorage);

}

// document.addEventListener('DOMContentLoaded', (e) => {
//   let times;
//   if (localStorage.getItem('times') === null) {
//     times = [];
//   } else {
//     times = JSON.parse(localStorage.getItem('times'));
//   }

//   console.log(localStorage);
// });

const storeFinishTime = (finish, id) => {

  let nikkoTime;
  let ryanTime;
  let ianTime;
  let andrewTime;

  if (id === 1) {
    if (localStorage.getItem('nikkoTime') === null) {
      nikkoTime = [];
    } else {
      nikkoTime = JSON.parse(localStorage.getItem('nikkoTime'));
    }

    nikkoTime.push(finish.toString());
    localStorage.setItem('nikkoTime', JSON.stringify(nikkoTime));
    
  }

  if (id === 2) {
    if (localStorage.getItem('ryanTime') === null) {
      ryanTime = [];
    } else {
      ryanTime = JSON.parse(localStorage.getItem('ryanTime'));
    }

    ryanTime.push(finish.toString());
    localStorage.setItem('ryanTime', JSON.stringify(ryanTime));
    
  }
  
  if (id === 3) {
    if (localStorage.getItem('ianTime') === null) {
      ianTime = [];
    } else {
      ianTime = JSON.parse(localStorage.getItem('ianTime'));
    }

    ianTime.push(finish.toString());
    localStorage.setItem('ianTime', JSON.stringify(ianTime));
    
  }

  if (id === 4) {
    if (localStorage.getItem('andrewTime') === null) {
      andrewTime = [];
    } else {
      andrewTime = JSON.parse(localStorage.getItem('andrewTime'));
    }

    andrewTime.push(finish.toString());
    localStorage.setItem('andrewTime', JSON.stringify(andrewTime));
    
  }

  console.log(localStorage);
  
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

    var time = localStorage.getItem('nikkoTime');
    time = time.substring(1, time.length - 1);
    time = time.split(',');
    var totalTime = Date.parse(time[1]) - Date.parse(time[0]);
    totalTime = totalTime / 1000;
    var seconds = totalTime % 60;
    var minutes = Math.floor((totalTime / 60)) / 60;
    var hours = Math.floor(totalTime / 3600);
    totalTime = "Hours: " + hours + " , Minutes: " + minutes + " , Seconds: " + seconds;
    
    localStorage.setItem('nikkoTotal', totalTime);
    console.log(localStorage);

  }

  if (id === 2) {

    var time = localStorage.getItem('ryanTime');
    time = time.substring(1, time.length - 1);
    time = time.split(',');
    var totalTime = Date.parse(time[1]) - Date.parse(time[0]);
    totalTime = totalTime / 1000;
    var seconds = totalTime % 60;
    var minutes = Math.floor((totalTime / 60)) / 60;
    var hours = Math.floor(totalTime / 3600);
    totalTime = "Hours: " + hours + " , Minutes: " + minutes + " , Seconds: " + seconds;
    
    localStorage.setItem('ryanTotal', totalTime);
    console.log(localStorage);
    
  }
  
  if (id === 3) {

    var time = localStorage.getItem('ianTime');
    time = time.substring(1, time.length - 1);
    time = time.split(',');
    var totalTime = Date.parse(time[1]) - Date.parse(time[0]);
    totalTime = totalTime / 1000;
    var seconds = totalTime % 60;
    var minutes = Math.floor((totalTime / 60)) / 60;
    var hours = Math.floor(totalTime / 3600);
    totalTime = "Hours: " + hours + " , Minutes: " + minutes + " , Seconds: " + seconds;
    
    localStorage.setItem('ianTotal', totalTime);
    console.log(localStorage);
    
  }

  if (id === 4) {

    var time = localStorage.getItem('andrewTime');
    time = time.substring(1, time.length - 1);
    time = time.split(',');
    var totalTime = Date.parse(time[1]) - Date.parse(time[0]);
    totalTime = totalTime / 1000;
    var seconds = totalTime % 60;
    var minutes = Math.floor((totalTime / 60)) / 60;
    var hours = Math.floor(totalTime / 3600);
    totalTime = "Hours: " + hours + " , Minutes: " + minutes + " , Seconds: " + seconds;
    
    localStorage.setItem('andrewTotal', totalTime);
    console.log(localStorage);
    
  }

}

